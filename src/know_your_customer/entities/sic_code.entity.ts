import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { KnowYourCustomer } from './know_your_customer.entity';
import { Abstract } from 'abstract.entity';

@Entity('sic_code')
@Unique(['kyc.id', 'sic_code', 'sic_description'])
export class Sic_Code extends Abstract {
  @Column({ nullable: false })
  sic_code: number;

  @Column({ nullable: false })
  sic_description: string;

  @ManyToOne(() => KnowYourCustomer, (kyc) => kyc.codes)
  @JoinColumn({ name: 'form_id' })
  kyc: KnowYourCustomer;
}
