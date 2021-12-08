import { Test, TestingModule } from '@nestjs/testing';
import * as mongoose from 'mongoose';
import { MealGroupController } from './meal-group.controller';
import { MealGroupService } from './meal-group.service';

describe('Given MealGroupController', () => {
  let controller: MealGroupController;
  let service: MealGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MealGroupController],
      providers: [
        {
          provide: MealGroupService,
          useValue: {
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            getById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MealGroupController>(MealGroupController);
    service = module.get<MealGroupService>(MealGroupService);
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
      controller.remove('', '', '');
      expect(service.remove).toHaveBeenCalled();
    });
  });
});
