import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ProfessionalModule } from './professional.module';
import { ProfessionalService } from './professional.service';
import { S3ImageService } from '../../services/s3-image-service/s3-image-service.service';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientModule } from '../patient/patient.module';
import { ChatModule } from '../chat/chat.module';
import { MessageModule } from '../message/message.module';
import { AppController } from '../../app.controller';
import { AppService } from '../../app.service';

describe('Given the professional routes', () => {
  let app: INestApplication;
  /* const professionalService = { findOne: () => ['test'] }; */

  beforeAll(async () => {
    const ENV = process.env.NODE_ENV;

    const moduleRef = await Test.createTestingModule({
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
      /* .overrideProvider(ProfessionalService)
      .useValue(professionalService) */
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it(`/GET professional/:id`, () => {
    return request(app.getHttpServer())
      .get('/professional/61a4f4a93d6cc562f1fb52a9')
      .expect(200)
      .expect({
        _id: '61a4f4a93d6cc562f1fb52a9',
        patients: [],
        password:
          '$2b$10$Mrfmlnerkvci82XjtVIr9OzHe0nlnnzWB8fq.xkn4IXDf9go8UEl.',
        email: ' string',
        businessName: ' stringo',
        surname: ' stringo',
        name: ' stringoooo',
        profilePicture:
          'https://metamed-images.s3.eu-west-3.amazonaws.com/7d843cfa-87ce-4213-80e1-76f47255a4f1',
        role: 'Professional',
        __v: 0,
      });
  });
});
