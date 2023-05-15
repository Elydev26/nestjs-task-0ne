/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AwsService {
  private s3: S3;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3({
      region: this.configService.get('AWS_S3_REGION'),
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),

    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileKey = `${uuidv4()}-${file.originalname}`;
    const uploadResult = await this.s3
      .upload({
        Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
        Key: fileKey,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
      .promise();
    return uploadResult.Location;
  }
  
  async getFileUrl(fileKey: string): Promise<string> {
    const fileUrl = await this.s3.getSignedUrlPromise('getObject', {
      Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
      Key: fileKey,
    });
    return fileUrl;
  }
}


