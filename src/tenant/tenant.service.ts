import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Tenant } from './entities/tenant.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant) private tenantRepo: Repository<Tenant>,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  async createTenant(name: string) {
    const tenant = new Tenant();
    tenant.name = name;
    tenant.schema = `schema_${name.toLowerCase()}`;
    await this.createSchema(tenant.schema);
    const newTenant = await this.tenantRepo.save(tenant);
    await this.switchSchema(tenant.schema);
    await this.dataSource.query(
      `CREATE TABLE IF NOT EXISTS "${tenant.schema}"."company" (` +
        `"id" SERIAL PRIMARY KEY, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now())`,
    );
    return newTenant;
  }
  async createSchema(schema: string) {
    await this.dataSource.query(`CREATE SCHEMA IF NOT EXISTS "${schema}"`);
  }
  async switchSchema(schema: string): Promise<void> {
    await this.dataSource.query(`SET search_path TO "${schema}"`);
  }
  async findAllTenants(): Promise<Tenant[]> {
    return await this.tenantRepo.find();
  }
  async findTenantByName(name: string): Promise<any> {
    const reps = await this.tenantRepo.findBy({ name });
    return reps;
  }
}
