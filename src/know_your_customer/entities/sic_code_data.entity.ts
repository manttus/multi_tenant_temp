import { Column, Entity, Unique } from 'typeorm';
import { Abstract } from 'abstract.entity';

@Entity('sic_code_data')
@Unique(['sic_code', 'sic_description'])
export class Sic_Code_Data extends Abstract {
  @Column({ nullable: false })
  sic_code: number;

  @Column({ nullable: false })
  sic_description: string;
}
