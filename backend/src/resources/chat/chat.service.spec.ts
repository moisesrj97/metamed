import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from './chat.service';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Message, MessageSchema } from '../message/message.schema';
import { Chat, ChatSchema } from './chat.schema';

describe('Given ChatService', () => {
  let service: ChatService;

  beforeEach(async () => {
    const mockRepository = {
      create() {
        return 'create model';
      },
      findByIdAndUpdate() {
        return 'find model';
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatService],
      imports: [
        MongooseModule.forFeature([
          { name: Message.name, schema: MessageSchema },
          { name: Chat.name, schema: ChatSchema },
        ]),
      ],
    })
      .overrideProvider(getModelToken('Chat'))
      .useValue(mockRepository)
      .overrideProvider(getModelToken('Message'))
      .useValue(mockRepository)
      .compile();

    service = module.get<ChatService>(ChatService);
  });

  describe('When it is instanciated', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('When service.update is executed with valid token', () => {
    it('It should return data without errors', async () => {
      process.env.JWT_SECRET = 'test';

      const response = await service.update(
        'f8f8f8f8f8f8',
        { to: 'f9f9f9f9f9f9', text: 'Hello test' },
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiJmOGY4ZjhmOGY4ZjkiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJuYW1lIjoidGVzdCIsImlhdCI6MTUxNjIzOTAyMn0.jYXlg2_VxJ3WpmNPywOlNgmQZNP0q6qA8qf7vNZKM0k',
      );

      expect(response).toBe('create model');
    });
  });

  describe('When service.update is executed with valid token of patient', () => {
    it('It should return data without errors', async () => {
      process.env.JWT_SECRET = 'test';

      const response = await service.update(
        'f8f8f8f8f8f8',
        { to: 'f9f9f9f9f9f9', text: 'Hello test' },
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUGF0aWVudCIsImlkIjoiNjFhNGY0YTkzZDZjYzU2MmYxZmI1MmE5IiwibmFtZSI6ImFhYWEiLCJlYW1pbCI6ImFhYSIsImlhdCI6MTUxNjIzOTAyMn0.ml57PoWBI1WVRZNLfAlfZt6mdD9r5T2RvKssNw5UMyg',
      );

      expect(response).toBe('create model');
    });
  });

  describe('When service.update is executed with invalid token', () => {
    it('It should return data without errors', async () => {
      process.env.JWT_SECRET = 'test';

      try {
        await service.update(
          'f8f8f8f8f8f8',
          { to: 'f9f9f9f9f9f9', text: 'Hello test' },
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiJmOGY4ZjhmOGY4ZjkiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJuYW1lIjoidGVzdCIsImlhdCI6MTUxNjIzOTAyMn0.jYXlg2_VxJ3WpmNPywOlNgmQZNP0q6qA8qf7vNZKM0k',
        );
      } catch (e) {
        expect(e).toEqual(
          Error('You are not authorized to perform this action'),
        );
      }
    });
  });
});
