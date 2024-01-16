import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Tenant' })
export class Tenant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  schema: string;
}
