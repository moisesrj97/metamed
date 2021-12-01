import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfessionalModule } from './resources/professional/professional.module';
import { S3ImageService } from './services/s3-image-service/s3-image-service.service';
import { PatientModule } from './resources/patient/patient.module';
import { ChatModule } from './resources/chat/chat.module';
import { MessageModule } from './resources/message/message.module';
import { ConfigModule } from '@nestjs/config';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    LoggerModule.forRoot(),

    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    ProfessionalModule,
    PatientModule,
    ChatModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService, S3ImageService],
})
export class AppModule {}
