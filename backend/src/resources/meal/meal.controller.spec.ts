import { Test, TestingModule } from '@nestjs/testing';
import { MealController } from './meal.controller';
import { MealService } from './meal.service';
import * as mongoose from 'mongoose';

describe('Given MealController', () => {
  let controller: MealController;
  let service: MealService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MealController],
      providers: [
        {
          provide: MealService,
          useValue: {
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MealController>(MealController);
    service = module.get<MealService>(MealService);
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
          mealGroupId: '',
        },
        '',
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
