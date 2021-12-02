import { Test, TestingModule } from '@nestjs/testing';
import * as mongoose from 'mongoose';
import { ExerciseGroupController } from './exercise-group.controller';
import { ExerciseGroupService } from './exercise-group.service';

describe('Given ExerciseGroupController', () => {
  let controller: ExerciseGroupController;
  let service: ExerciseGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExerciseGroupController],
      providers: [
        {
          provide: ExerciseGroupService,
          useValue: {
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            getById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ExerciseGroupController>(ExerciseGroupController);
    service = module.get<ExerciseGroupService>(ExerciseGroupService);
  });
  describe('When it is instanciated', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  });

  describe('When controller.getById is executed', () => {
    it('service.getById should be called', () => {
      controller.getById('', '');
      expect(service.getById).toHaveBeenCalled();
    });
  });

  describe('When controller.create is executed', () => {
    it('service.create should be called', () => {
      controller.create(
        { patient: new mongoose.Types.ObjectId('f8f8f8f8f8f8'), name: '' },
        '',
      );
      expect(service.create).toHaveBeenCalled();
    });
  });

  describe('When controller.update is executed', () => {
    it('service.update should be called', () => {
      controller.update('', { name: '', extra: '' }, '');
      expect(service.update).toHaveBeenCalled();
    });
  });

  describe('When controller.remove is executed', () => {
    it('service.remove should be called', () => {
      controller.remove('', { patientId: '' }, '');
      expect(service.remove).toHaveBeenCalled();
    });
  });
});
