import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

describe('Given LoginController', () => {
  let controller: LoginController;
  let service: LoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [
        {
          provide: LoginService,
          useValue: {
            loginProfessionalWithToken: jest.fn(),
            loginProfessionalWithoutToken: jest.fn(),
            loginPatientWithToken: jest.fn(),
            loginPatientWithoutToken: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<LoginController>(LoginController);
    service = module.get<LoginService>(LoginService);
  });
  describe('When it is instanciated', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  });

  describe('When controller.loginProfessionalWithToken is called', () => {
    it('It should call service.loginProfessionalWithToken', () => {
      controller.loginProfessionalWithToken('');
      expect(service.loginProfessionalWithToken).toHaveBeenCalled();
    });
  });

  describe('When controller.loginProfessionalWithoutToken is called', () => {
    it('It should call service.loginProfessionalWithoutToken', () => {
      controller.loginProfessionalWithoutToken('', '');
      expect(service.loginProfessionalWithoutToken).toHaveBeenCalled();
    });
  });

  describe('When controller.loginPatientWithToken is called', () => {
    it('It should call service.loginPatientWithToken', () => {
      controller.loginPatientWithToken('');
      expect(service.loginPatientWithToken).toHaveBeenCalled();
    });
  });

  describe('When controller.loginPatientWithoutToken is called', () => {
    it('It should call service.loginPatientWithoutToken', () => {
      controller.loginPatientWithoutToken('', '');
      expect(service.loginPatientWithoutToken).toHaveBeenCalled();
    });
  });
});
