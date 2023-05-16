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
      region: this.configService.get('aws_s3_region'),
      accessKeyId: this.configService.get('aws_access_key_id'),
      secretAccessKey: this.configService.get('aws_secret_access_key'),

    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileKey = `${uuidv4()}-${file.originalname}`;
    const uploadResult = await this.s3
      .upload({
        Bucket: this.configService.get('aws_s3_bucket_name'),
        Key: fileKey,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
      .promise();
    return uploadResult.Location;
  }
  
  async getFileUrl(fileKey: string): Promise<string> {
    const fileUrl = await this.s3.getSignedUrlPromise('getObject', {
      Bucket: this.configService.get('aws_s3_bucket_name'),
      Key: fileKey,
    });
    return fileUrl;
  }
}


