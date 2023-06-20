import { Injectable } from '@nestjs/common';
import * as OSS from 'ali-oss';

@Injectable()
export class UploadService {
  private client: OSS;
  constructor() {
    this.client = new OSS({
      region: 'oss-cn-beijing',
      accessKeyId: 'LTAI5tMfeAjUtvf1HtxpayFk',
      accessKeySecret: '0g5OzXBH8dgLgiZOzCibStH9Pp2nax',
      bucket: 'cvnert',
    });
  }
  async uploadFile(file, filename: string) {
    console.log('-------', file);
    const result = await this.client.put(filename, file.buffer);

    return result.url;
  }
}
