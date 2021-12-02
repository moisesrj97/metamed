import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import * as mongoose from 'mongoose';
import { S3ImageService } from '../../services/s3-image-service/s3-image-service.service';
import { Chat, ChatSchema } from '../chat/chat.schema';
import { Patient, PatientSchema } from '../patient/patient.schema';
import { ProfessionalEntity } from './entities/professional.entity';
import { ProfessionalController } from './professional.controller';
import { Professional, ProfessionalSchema } from './professional.schema';
import { ProfessionalService } from './professional.service';

describe('Given ProfessionalService', () => {
  let service: ProfessionalService;

  beforeEach(async () => {
    const mockRepository = {
      findById() {
        return {
          populate: () => {
            return {
              patients: [
                {
                  refData: new mongoose.Types.ObjectId('f8f8f8f8f8f8'),
                  chatRef: 'f9f9f9f9f9f9',
                },
              ],
            };
          },
        };
      },
      create() {
        return 'create model';
      },
      findByIdAndUpdate() {
        return {
          patients: [
            {
              refData: new mongoose.Types.ObjectId('f8f8f8f8f8f8'),
              chatRef: 'f9f9f9f9f9f9',
            },
          ],
        };
      },
      findByIdAndDelete() {
        return [{ refData: new mongoose.Types.ObjectId('f8f8f8f8f8f8') }];
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
  describe('When it is instanciated', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('When service.create is executed', () => {
    test('should call create on model', async () => {
      const professional = await service.create(
        new ProfessionalEntity('', '', '', '', '', 'test'),
        '' as unknown as Express.Multer.File,
      );
      expect(professional).toBe('create model');
    });
  });

  describe('When service.findOne is executed', () => {
    test('should call findById on model', async () => {
      const professional = await service.findOne('');
      expect(professional).toEqual({
        patients: [
          {
            refData: new mongoose.Types.ObjectId('f8f8f8f8f8f8'),
            chatRef: 'f9f9f9f9f9f9',
          },
        ],
      });
    });
  });

  describe('When service.update is executed', () => {
    test('should call findByIdAndUpdate on model', async () => {
      const professional = await service.update(
        '',
        { name: '', surname: '', businessName: '', profilePicture: '' },
        '' as unknown as Express.Multer.File,
      );
      expect(professional).toEqual({
        patients: [
          {
            refData: new mongoose.Types.ObjectId('f8f8f8f8f8f8'),
            chatRef: 'f9f9f9f9f9f9',
          },
        ],
      });
    });
  });

  describe('When service.update is executed with a file', () => {
    test('should call findByIdAndUpdate on model', async () => {
      const professional = await service.update(
        '',
        { name: '', surname: '', businessName: '', profilePicture: '' },
        { test: 'test' } as unknown as Express.Multer.File,
      );
      expect(professional).toEqual({
        patients: [
          {
            refData: new mongoose.Types.ObjectId('f8f8f8f8f8f8'),
            chatRef: 'f9f9f9f9f9f9',
          },
        ],
      });
    });
  });

  describe('When service.addPatientToProfessional is executed', () => {
    test('should call findByIdAndUpdate on model', async () => {
      const professional = await service.addPatientToProfessional(
        'f8f8f8f8f8f8',
        'f8f8f8f8f8f8',
      );
      expect(professional).toEqual({
        patients: [
          {
            refData: new mongoose.Types.ObjectId('f8f8f8f8f8f8'),
            chatRef: 'f9f9f9f9f9f9',
          },
        ],
      });
    });
  });

  describe('When service.updatePatientFromProfessional is executed', () => {
    test('should call findByIdAndUpdate on model', async () => {
      const professional = await service.updatePatientFromProfessional(
        'f8f8f8f8f8f8',
        'f8f8f8f8f8f8',
        [],
      );
      expect(professional).toEqual({
        patients: [
          {
            refData: new mongoose.Types.ObjectId('f8f8f8f8f8f8'),
            chatRef: 'f9f9f9f9f9f9',
          },
        ],
      });
    });
  });

  describe('When service.removePatientFromProfessional is executed', () => {
    test('should call findByIdAndUpdate on model', async () => {
      const professional = await service.removePatientFromProfessional(
        'f8f8f8f8f8f8',
        '663866386638663866386638',
      );
      expect(professional).toEqual({
        patients: [
          {
            refData: new mongoose.Types.ObjectId('f8f8f8f8f8f8'),
            chatRef: 'f9f9f9f9f9f9',
          },
        ],
      });
    });
  });
});
