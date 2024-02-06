import { Module } from '@nestjs/common';
import { TenantModule } from './tenant/tenant.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'database/data-source';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), TenantModule, UserModule, AuthenticationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
