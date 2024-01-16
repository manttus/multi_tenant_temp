import { Tenant } from 'src/tenant/entities/tenant.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  database: 'multitenant',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '73-55-608Cyka',
  synchronize: true,
  entities: ['dist/src/**/*.entity.js'],
  migrations: ['dist/database/migrations'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
