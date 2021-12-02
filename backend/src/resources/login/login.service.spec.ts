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
    findOne: jest.fn().mockResolvedValue({
      password: '$2a$12$ij9XCn5oFFfy/5b1UnpXv.P/H/3kcIPVSD.m1bbmKeGCzF/viD3eG',
    }),
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

  describe('When service.loginProfessionalWithToken is called without bearer in the token', () => {
    test('It should thor an error', () => {
      expect(() => service.loginProfessionalWithToken('token')).toThrow();
    });
  });

  describe('When service.loginProfessionalWithToken is called with invalid token', () => {
    test('It should thor an error', () => {
      expect(() =>
        service.loginProfessionalWithToken(
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYTdhNjNlNzE1NDcxYzJiYzY1OWFhYSIsImVtYWlsIjoiZmFrZUB0ZXN0LmNvbSIsIm5hbWUiOiIgc3RyaW5naXRvIiwicm9sZSI6IlBhdGllbnQiLCJpYXQiOjE2MzgzODA2NTB9.c8L6T_wNjoVBTaser5IbcXQfZak_UWjpz9uzi83t5p4',
        ),
      ).toThrow();
    });
  });

  describe('When service.loginProfessionalWithToken is called with valid token', () => {
    test('It shouldn´t thor an error and return data', () => {
      process.env.JWT_SECRET = 'test';
      const decodedToken = service.loginProfessionalWithToken(
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0IiwibmFtZSI6InRlc3QiLCJpYXQiOjE1MTYyMzkwMjJ9.XhrcIk_J_de5Mj_ZgSyN9KS4jlIqsf3Dw0uG2P_DJdo',
      );

      expect(decodedToken).toBeDefined();
      expect(decodedToken).toEqual({
        sub: 'test',
        name: 'test',
        iat: 1516239022,
      });
    });
  });

  describe('When service.loginPatientWithToken is called without bearer in the token', () => {
    test('It should thor an error', () => {
      expect(() => service.loginPatientWithToken('token')).toThrow();
    });
  });

  describe('When service.loginPatientWithToken is called with invalid token', () => {
    test('It should thor an error', () => {
      expect(() =>
        service.loginPatientWithToken(
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYTdhNjNlNzE1NDcxYzJiYzY1OWFhYSIsImVtYWlsIjoiZmFrZUB0ZXN0LmNvbSIsIm5hbWUiOiIgc3RyaW5naXRvIiwicm9sZSI6IlBhdGllbnQiLCJpYXQiOjE2MzgzODA2NTB9.c8L6T_wNjoVBTaser5IbcXQfZak_UWjpz9uzi83t5p4',
        ),
      ).toThrow();
    });
  });

  describe('When service.loginPatientWithToken is called with valid token', () => {
    test('It shouldn´t thor an error and return data', async () => {
      process.env.JWT_SECRET = 'test';
      const decodedToken = await service.loginPatientWithToken(
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0IiwibmFtZSI6InRlc3QiLCJpYXQiOjE1MTYyMzkwMjJ9.XhrcIk_J_de5Mj_ZgSyN9KS4jlIqsf3Dw0uG2P_DJdo',
      );

      expect(decodedToken).toBeDefined();
      expect(decodedToken).toEqual({
        sub: 'test',
        name: 'test',
        iat: 1516239022,
      });
    });
  });

  describe('When service.loginProfessionalWithoutToken is called with valid user and valid password', () => {
    test('It should return token', async () => {
      const result = await service.loginProfessionalWithoutToken('', 'test');

      expect(result).toBeDefined();
    });
  });

  describe('When service.loginProfessionalWithoutToken is called with valid user but invalid password', () => {
    test('It should throw an error', async () => {
      try {
        const response = await service.loginProfessionalWithoutToken(
          '',
          'testaaa',
        );
      } catch (e) {
        console.log(e);
        expect(e).toEqual(Error('Incorrect email or password'));
      }
    });
  });

  describe('When service.loginPatientWithoutToken is called with valid user and valid password', () => {
    test('It should return token', async () => {
      const result = await service.loginPatientWithoutToken('', 'test');

      expect(result).toBeDefined();
    });
  });

  describe('When service.loginPatientWithoutToken is called with valid user but invalid password', () => {
    test('It should throw an error', async () => {
      try {
        const response = await service.loginPatientWithoutToken('', 'testaaa');
      } catch (e) {
        console.log(e);
        expect(e).toEqual(Error('Incorrect email or password'));
      }
    });
  });
});
