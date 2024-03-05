import { Module } from '@nestjs/common';
import { KnowYourCustomerService } from './know_your_customer.service';
import { KnowYourCustomerController } from './know_your_customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KnowYourCustomer } from './entities/know_your_customer.entity';
import { CsvModule } from 'nest-csv-parser';
import { MulterModule } from '@nestjs/platform-express';
import { Sic_Code_Data } from './entities/sic_code_data.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([KnowYourCustomer, Sic_Code_Data]),
    CsvModule,
    MulterModule.register({
      dest: './upload',
    }),
  ],
  controllers: [KnowYourCustomerController],
  providers: [KnowYourCustomerService],
})
export class KnowYourCustomerModule {}
