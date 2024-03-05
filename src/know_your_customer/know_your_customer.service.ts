import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KnowYourCustomer } from './entities/know_your_customer.entity';
import { createReadStream } from 'fs';
import * as csv from 'csv-parser';
import { Sic_Code_Data } from './entities/sic_code_data.entity';

@Injectable()
export class KnowYourCustomerService {
  constructor(
    @InjectRepository(KnowYourCustomer)
    private readonly kycRepo: Repository<KnowYourCustomer>,
    @InjectRepository(Sic_Code_Data)
    private readonly sicRepo: Repository<Sic_Code_Data>,
  ) {}
  async upsert({
    package: pkg,
    company_name,
    kyc_id,
  }: {
    package: string;
    company_name: string;
    kyc_id: number;
  }) {
    try {
      const data = [
        { sic_code: 11120, sic_description: 'Br' },
        { sic_code: 11121, sic_description: 'Grrrrr' },
      ];
      const response = await this.kycRepo.query(
        `
          WITH upsert_data AS (
            INSERT INTO know_your_customer (package, company_name, kyc_id)
            VALUES ($1, $2, $3) ON CONFLICT (kyc_id) DO UPDATE
          SET company_name = $2, package = $1 RETURNING id
          )
          INSERT INTO sic_code (form_id, sic_code, sic_description)
          SELECT
            upsert_data.id,
            (sic_data->>'sic_code')::int AS sic_code,
             sic_data->>'sic_description' AS sic_description
          FROM upsert_data
          LEFT JOIN LATERAL (
            SELECT jsonb_array_elements($4::jsonb) AS sic_data
          ) AS json_data ON TRUE
           ON CONFLICT(form_id, sic_code, sic_description) DO NOTHING
         `,
        [pkg, company_name, kyc_id, JSON.stringify(data)],
      );

      return response[0];
    } catch (err) {
      console.log(err);
    }
  }

  async uploadSicCodeCsv(file: Express.Multer.File) {
    const results = [];
    try {
      createReadStream(file.path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
          await this.sicRepo.query(
            `
            INSERT INTO sic_code_data (sic_code, sic_description) 
              SELECT
                (item->>'SIC Code')::int AS sic_code,
                item->>'Description' AS sic_description
                FROM unnest($1::jsonb[]) AS item
            `,
            [results],
          );
        });
      return {
        message: 'File uploaded and parsed successfully',
      };
    } catch (err) {
      return {
        message: 'Something went wrong',
      };
    }
  }
}
