import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Message, MessageSchema } from './message.schema';
import { MessageService } from './message.service';

describe('Given MessageService', () => {
  let service: MessageService;

  beforeEach(async () => {
    const mockRepository = {
      findByIdAndUpdate() {
        return 'find model';
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [MessageService],
      imports: [
        MongooseModule.forFeature([
          { name: Message.name, schema: MessageSchema },
        ]),
      ],
    })
      .overrideProvider(getModelToken('Message'))
      .useValue(mockRepository)
      .compile();

    service = module.get<MessageService>(MessageService);
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
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiJmOGY4ZjhmOGY4ZjkiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJuYW1lIjoidGVzdCIsImlhdCI6MTUxNjIzOTAyMn0.jYXlg2_VxJ3WpmNPywOlNgmQZNP0q6qA8qf7vNZKM0k',
      );

      expect(response).toBe('find model');
    });
  });

  describe('When service.update is executed with invalid token', () => {
    it('It should return data without errors', async () => {
      process.env.JWT_SECRET = 'test';

      try {
        await service.update(
          'f8f8f8f8f8f8',
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
