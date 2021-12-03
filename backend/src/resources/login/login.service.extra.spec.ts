import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Patient, PatientSchema } from '../patient/patient.schema';
import {
  Professional,
  ProfessionalSchema,
} from '../professional/professional.schema';
import { LoginService } from './login.service';

describe('Given LoginService', () => {
  let service: LoginService;

  const mockRepository = {
    findOne: jest.fn().mockResolvedValue(null),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoginService],
      imports: [
        MongooseModule.forFeature([
          { name: Patient.name, schema: PatientSchema },
          { name: Professional.name, schema: ProfessionalSchema },
        ]),
      ],
    })
      .overrideProvider(getModelToken('Patient'))
      .useValue(mockRepository)
      .overrideProvider(getModelToken('Professional'))
      .useValue(mockRepository)
      .compile();

    service = module.get<LoginService>(LoginService);
  });

  describe('When it is instanciated', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('When service.loginWithoutToken is called with invalid user', () => {
    test('It should throw an error', async () => {
      try {
        await service.loginWithoutToken('Professional', '', 'testaaa');
      } catch (e) {
        expect(e).toEqual(Error('Incorrect email or password'));
      }
    });
  });

  describe('When service.loginWithoutToken is called with valid user but invalid password', () => {
    test('It should throw an error', async () => {
      try {
        await service.loginWithoutToken('Patient', '', 'testaaa');
      } catch (e) {
        expect(e).toEqual(Error('Incorrect email or password'));
      }
    });
  });
});
