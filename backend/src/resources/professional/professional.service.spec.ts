import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { S3ImageService } from '../../services/s3-image-service/s3-image-service.service';
import { Chat, ChatSchema } from '../chat/chat.schema';
import { Patient, PatientSchema } from '../patient/patient.schema';
import { ProfessionalController } from './professional.controller';
import { Professional, ProfessionalSchema } from './professional.schema';
import { ProfessionalService } from './professional.service';

describe('ProfessionalService', () => {
  let service: ProfessionalService;

  beforeEach(async () => {
    const mockRepository = {
      find() {
        return {};
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature([
          { name: Professional.name, schema: ProfessionalSchema },
          { name: Patient.name, schema: PatientSchema },
          { name: Chat.name, schema: ChatSchema },
        ]),
      ],
      controllers: [ProfessionalController],
      providers: [
        ProfessionalService,
        {
          provide: S3ImageService,
          useValue: {
            uploadFile: jest.fn(),
            deleteFile: jest.fn(),
            updateFile: jest.fn(),
          },
        },
      ],
    })
      .overrideProvider(getModelToken('Patient'))
      .useValue(mockRepository)
      .overrideProvider(getModelToken('Professional'))
      .useValue(mockRepository)
      .overrideProvider(getModelToken('Chat'))
      .useValue(mockRepository)
      .compile();

    service = module.get<ProfessionalService>(ProfessionalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
