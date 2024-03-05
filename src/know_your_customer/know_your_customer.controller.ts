import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { KnowYourCustomerService } from './know_your_customer.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('know-your-customer')
export class KnowYourCustomerController {
  constructor(
    private readonly knowYourCustomerService: KnowYourCustomerService,
  ) {}

  @Post()
  upsert(
    @Body()
    createKnowYourCustomerDto: {
      package: string;
      company_name: string;
      kyc_id: number;
    },
  ) {
    return this.knowYourCustomerService.upsert(createKnowYourCustomerDto);
  }

  @Post('code')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.knowYourCustomerService.uploadSicCodeCsv(file);
  }
}
