import { Module } from '@nestjs/common';
import { TenantModule } from './tenant/tenant.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'database/data-source';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), TenantModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
