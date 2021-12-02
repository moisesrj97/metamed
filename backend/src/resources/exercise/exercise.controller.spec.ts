import { Test, TestingModule } from '@nestjs/testing';
import * as mongoose from 'mongoose';
import { ExerciseController } from './exercise.controller';
import { ExerciseService } from './exercise.service';

describe('Given ExerciseController', () => {
  let controller: ExerciseController;
  let service: ExerciseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExerciseController],
      providers: [
        {
          provide: ExerciseService,
          useValue: {
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ExerciseController>(ExerciseController);
    service = module.get<ExerciseService>(ExerciseService);
  });
  describe('When it is instanciated', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  });

  describe('When controller.create is executed', () => {
    it('Service.create is called', () => {
      controller.create(
        {
          author: new mongoose.Types.ObjectId('f8f8f8f8f8f8'),
          name: '',
          amount: '',
          exerciseGroupId: '',
        },
        '',
        '' as unknown as Express.Multer.File,
      );

      expect(service.create).toHaveBeenCalled();
    });
  });

  describe('When controller.update is executed', () => {
    it('Service.update is called', () => {
      controller.update(
        '',
        {
          name: '',
          amount: '',
          imageUrl: '',
        },
        '',
      );

      expect(service.update).toHaveBeenCalled();
    });
  });

  describe('When controller.remove is executed', () => {
    it('Service.remove is called', () => {
      controller.remove('', '');

      expect(service.remove).toHaveBeenCalled();
    });
  });
});
