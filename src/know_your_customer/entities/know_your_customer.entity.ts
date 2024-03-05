import { Abstract } from 'abstract.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Sic_Code } from './sic_code.entity';

@Entity('know_your_customer')
export class KnowYourCustomer extends Abstract {
  @Column({ nullable: false })
  package: string;

  @Column({ nullable: false })
  company_name: string;

  @OneToMany(() => Sic_Code, (code) => code.kyc)
  codes: Sic_Code[];

  @Column({ nullable: false, unique: true })
  kyc_id: number;
}
