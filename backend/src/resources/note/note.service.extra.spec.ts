import { Test, TestingModule } from '@nestjs/testing';
import * as mongoose from 'mongoose';
import { NoteService } from './note.service';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Patient, PatientSchema } from '../patient/patient.schema';
import {
  Professional,
  ProfessionalSchema,
} from '../professional/professional.schema';
import { Note, NoteSchema } from './note.schema';

describe('Given NoteService', () => {
  let service: NoteService;

  const professionalMockRepository = {
    findByIdAndUpdate: jest.fn().mockRejectedValue(new Error('error')),
  };

  const patientMockRepository = {
    findOne: jest.fn().mockResolvedValue({
      password: '$2a$12$ij9XCn5oFFfy/5b1UnpXv.P/H/3kcIPVSD.m1bbmKeGCzF/viD3eG',
    }),
  };

  const noteMockRepository = {
    create: jest.fn().mockResolvedValue({
      _id: 'f9f9f9f9f9f9',
    }),
    findOne: jest.fn().mockResolvedValue({
      _id: 'f2f2f2f2f2f2',
      author: 'f8f8f8f8f8f8',
    }),
    findByIdAndUpdate: jest.fn().mockResolvedValue({
      _id: 'f2f2f2f2f2f2',
      author: 'f8f8f8f8f8f8',
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NoteService],
      imports: [
        MongooseModule.forFeature([
          { name: Patient.name, schema: PatientSchema },
          { name: Professional.name, schema: ProfessionalSchema },
          { name: Note.name, schema: NoteSchema },
        ]),
      ],
    })
      .overrideProvider(getModelToken('Patient'))
      .useValue(patientMockRepository)
      .overrideProvider(getModelToken('Professional'))
      .useValue(professionalMockRepository)
      .overrideProvider(getModelToken('Note'))
      .useValue(noteMockRepository)
      .compile();

    service = module.get<NoteService>(NoteService);
  });

  describe('When service.create is called with invalid profesional or patient id', () => {
    it('It throws an error', async () => {
      process.env.JWT_SECRET = 'test';
      try {
        await service.create(
          {
            title: 'Test',
            patient: new mongoose.Types.ObjectId('f8f8f8f8f8f8'),
          },
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiJmOGY4ZjhmOGY4ZjgiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJuYW1lIjoidGVzdCIsImlhdCI6MTUxNjIzOTAyMn0.2D8RXLfMCZRovoodPQNj-XfjaLXhFTk64BlThks42As',
        );
      } catch (e) {
        expect(e.message).toEqual('Patient or professional not found');
      }
    });
  });

  describe('When service.update is called with invalid profesional or patient id', () => {
    it('It throws an error', async () => {
      process.env.JWT_SECRET = 'test';
      try {
        await service.update(
          '',
          {
            title: 'Test',
            description: 'Test',
          },
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiJmOGY4ZjhmOGY4ZjgiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJuYW1lIjoidGVzdCIsImlhdCI6MTUxNjIzOTAyMn0.2D8RXLfMCZRovoodPQNj-XfjaLXhFTk64BlThks42As',
        );
      } catch (e) {
        expect(e.message).toEqual('Patient or professional not found');
      }
    });
  });
});
