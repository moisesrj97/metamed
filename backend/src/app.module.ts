import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfessionalModule } from './resources/professional/professional.module';
import { S3ImageService } from './services/s3-image-service/s3-image-service.service';
import * as dotenv from 'dotenv';

dotenv.config();

const uri: string =
  process.env.NODE_ENV === 'production'
    ? process.env.MONGO_URI
    : process.env.MONGO_URI_TEST;

@Module({
  imports: [
    LoggerModule.forRoot(),
    MongooseModule.forRoot(uri),
    ProfessionalModule,
  ],
  controllers: [AppController],
  providers: [AppService, S3ImageService],
})
export class AppModule {}
