import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import s3 from './s3.config';

@Injectable()
export class S3ImageService {
  async uploadFile(file: any) {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: String(uuid()),
      Body: file.buffer,
      ACL: 'public-read',
      ContentType: file.mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: process.env.AWS_REGION,
      },
    };

    try {
      const s3Response = await s3.upload(params).promise();
      return s3Response.Location;
    } catch (e) {
      throw new Error(e);
    }
  }

  async deleteFile(url: string) {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: url.split('/').pop(),
    };

    try {
      return await s3.deleteObject(params).promise();
    } catch (e) {
      throw new Error(e);
    }
  }

  async updateFile(file: any, url: string) {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: url.split('/').pop(),
      Body: file.buffer,
      ACL: 'public-read',
      ContentType: file.mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: process.env.AWS_REGION,
      },
    };

    try {
      return await s3.upload(params).promise();
    } catch (e) {
      throw new Error(e);
    }
  }
}
