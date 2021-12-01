import { Test, TestingModule } from '@nestjs/testing';
import { S3ImageService } from './s3-image-service.service';
import s3 from './s3.config';

jest.mock('./s3.config.ts');

describe('Given S3ImageService', () => {
  let service: S3ImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [S3ImageService],
    }).compile();

    service = module.get<S3ImageService>(S3ImageService);
  });
  describe('When it is compiled...', () => {
    test('It should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('When uploadFile it is called...', () => {
    test('It should call s3.upload', async () => {
      s3.upload = jest.fn().mockReturnValue({
        promise: jest.fn().mockResolvedValue({
          Location: 'https://s3.amazonaws.com/bucket/image.jpg',
          key: 'image.jpg',
          Bucket: 'bucket',
          ETag: '"e1f7b0a74e25fcfadb3ba62409b0adcf"',
        }),
      });

      const result = await service.uploadFile('');

      expect(service.uploadFile).toBeDefined();
      expect(s3.upload).toHaveBeenCalled();
      expect(result).toBe('https://s3.amazonaws.com/bucket/image.jpg');
    });
  });

  describe('When uploadFile it is called with an error...', () => {
    test('It should throw an error', async () => {
      s3.upload = jest.fn().mockReturnValue({
        promise: jest.fn().mockRejectedValue(new Error("Can't upload file")),
      });

      const result = service.uploadFile('');

      expect(result).rejects.toThrow(Error);
    });
  });

  describe('When updateFile it is called...', () => {
    test('It should call s3.upload', async () => {
      s3.upload = jest.fn().mockReturnValue({
        promise: jest.fn().mockResolvedValue({
          Location: 'https://s3.amazonaws.com/bucket/image.jpg',
          key: 'image.jpg',
          Bucket: 'bucket',
          ETag: '"e1f7b0a74e25fcfadb3ba62409b0adcf"',
        }),
      });

      const result = await service.updateFile('', '');

      expect(service.updateFile).toBeDefined();
      expect(s3.upload).toHaveBeenCalled();
      expect(result.Location).toBe('https://s3.amazonaws.com/bucket/image.jpg');
    });
  });

  describe('When updateFile it is called with an error...', () => {
    test('It should throw an error', async () => {
      s3.upload = jest.fn().mockReturnValue({
        promise: jest.fn().mockRejectedValue(new Error("Can't upload file")),
      });

      const result = service.updateFile('', '');

      expect(result).rejects.toThrow(Error);
    });
  });

  describe('When deleteFile it is called...', () => {
    test('It should call s3.upload', async () => {
      s3.deleteObject = jest.fn().mockReturnValue({
        promise: jest.fn().mockResolvedValue({
          Location: 'https://s3.amazonaws.com/bucket/image.jpg',
          key: 'image.jpg',
          Bucket: 'bucket',
          ETag: '"e1f7b0a74e25fcfadb3ba62409b0adcf"',
        }),
      });

      const result = await service.deleteFile('');

      expect(service.deleteFile).toBeDefined();
      expect(s3.upload).toHaveBeenCalled();
    });
  });

  describe('When deleteFile it is called with an error...', () => {
    test('It should throw an error', async () => {
      s3.deleteObject = jest.fn().mockReturnValue({
        promise: jest.fn().mockRejectedValue(new Error("Can't upload file")),
      });

      const result = service.deleteFile('');

      expect(result).rejects.toThrow(Error);
    });
  });
});
