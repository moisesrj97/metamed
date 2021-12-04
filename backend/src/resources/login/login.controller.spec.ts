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
            loginWithToken: jest.fn(),
            loginWithoutToken: jest.fn(),
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
    it('It should call service.loginWithToken', () => {
      controller.loginWithToken('');
      expect(service.loginWithToken).toHaveBeenCalled();
    });
  });

  describe('When controller.loginProfessionalWithoutToken is called', () => {
    it('It should call service.loginWithoutToken', () => {
      controller.loginProfessionalWithoutToken('', '');
      expect(service.loginWithoutToken).toHaveBeenCalled();
    });
  });

  describe('When controller.loginPatientWithToken is called', () => {
    it('It should call service.loginPatientWithToken', () => {
      controller.loginWithToken('');
      expect(service.loginWithToken).toHaveBeenCalled();
    });
  });

  describe('When controller.loginPatientWithoutToken is called', () => {
    it('It should call service.loginWithoutToken', () => {
      controller.loginPatientWithoutToken('', '');
      expect(service.loginWithoutToken).toHaveBeenCalled();
    });
  });
});
