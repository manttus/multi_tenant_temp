import { PartialType } from '@nestjs/mapped-types';
import { CreateKnowYourCustomerDto } from './create-know_your_customer.dto';

export class UpdateKnowYourCustomerDto extends PartialType(CreateKnowYourCustomerDto) {}
