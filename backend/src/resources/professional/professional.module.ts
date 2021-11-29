import { Module } from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { ProfessionalController } from './professional.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Professional, ProfessionalSchema } from './professional.schema';
import { S3ImageService } from 'src/services/s3-image-service/s3-image-service.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Professional.name, schema: ProfessionalSchema },
    ]),
  ],
  controllers: [ProfessionalController],
  providers: [ProfessionalService, S3ImageService],
})
export class ProfessionalModule {}
