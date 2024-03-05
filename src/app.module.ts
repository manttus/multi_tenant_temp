import { Module } from '@nestjs/common';
import { TenantModule } from './tenant/tenant.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'database/data-source';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { KnowYourCustomerModule } from './know_your_customer/know_your_customer.module';
import { CsvModule } from 'nest-csv-parser';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TenantModule,
    UserModule,
    AuthenticationModule,
    KnowYourCustomerModule,
    CsvModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
