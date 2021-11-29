import { Test, TestingModule } from '@nestjs/testing';
import { S3ImageServiceService } from './s3-image-service.service';

describe('S3ImageServiceService', () => {
  let service: S3ImageServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [S3ImageServiceService],
    }).compile();

    service = module.get<S3ImageServiceService>(S3ImageServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
