import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import * as dotenv from 'dotenv';
import { v4 as uuid } from 'uuid';

dotenv.config();

@Injectable()
export class S3ImageService {
  s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  async uploadFile(file: any) {
    const { Location: url } = await this.s3_upload(
      file.buffer,
      process.env.AWS_BUCKET_NAME,
      file.mimetype,
    );

    return url;
  }

  async deleteFile(url: string) {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: url.split('/').pop(),
    };

    try {
      const s3Response = await this.s3.deleteObject(params).promise();
      return s3Response;
    } catch (e) {
      throw new Error(e);
    }
  }

  async updateFile(file: any, url: string) {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: url.split('/').pop(),
      Body: file,
      ACL: 'public-read',
      ContentType: file.mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: process.env.AWS_REGION,
      },
    };

    try {
      const s3Response = await this.s3.upload(params).promise();
      return s3Response;
    } catch (e) {
      throw new Error(e);
    }
  }

  async s3_upload(file: any, bucket: string, mimetype: any) {
    const params = {
      Bucket: bucket,
      Key: String(uuid()),
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: process.env.AWS_REGION,
      },
    };

    try {
      const s3Response = await this.s3.upload(params).promise();
      return s3Response;
    } catch (e) {
      throw new Error(e);
    }
  }
}
