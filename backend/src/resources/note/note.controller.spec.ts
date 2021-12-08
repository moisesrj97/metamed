import { Test, TestingModule } from '@nestjs/testing';
import * as mongoose from 'mongoose';

import { NoteController } from './note.controller';
import { NoteService } from './note.service';

describe('Given NoteController', () => {
  let controller: NoteController;
  let service: NoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoteController],
      providers: [
        {
          provide: NoteService,
          useValue: {
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            getById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<NoteController>(NoteController);
    service = module.get<NoteService>(NoteService);
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
        { patient: new mongoose.Types.ObjectId('f8f8f8f8f8f8'), title: '' },
        '',
      );
      expect(service.create).toHaveBeenCalled();
    });
  });

  describe('When controller.update is executed', () => {
    it('service.update should be called', () => {
      controller.update('', { title: '', description: '' }, '');
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
