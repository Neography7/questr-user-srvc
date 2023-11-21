import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import * as sharp from 'sharp';

@Injectable()
export class S3Service {
  private s3: S3;

  constructor() {
    this.s3 = new S3({
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY
    });
  }

  async uploadBase64ToS3(base64Data: string, fileName: string, filedir: string): Promise<string> {

    const s3BucketName = process.env.S3_BUCKET;
    
    if (!s3BucketName) {
        throw new Error('S3_BUCKET is not configured.');
    }

    const base64String = base64Data.replace(/^data:image\/jpeg;base64,/, '');

    const bufferData = Buffer.from(base64String, 'base64');

    const pngBuffer = await sharp(bufferData)
      .toFormat('png')
      .toBuffer();

    const key = filedir + '/' + fileName + ".png";

    const params: S3.Types.PutObjectRequest = {
        Bucket: s3BucketName,
        Key: key,
        Body: pngBuffer,
        ContentType: 'image/png'
    };

    const result = await this.s3.upload(params).promise();

    return result.Location;

  }
}