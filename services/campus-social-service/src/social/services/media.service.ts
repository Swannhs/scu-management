import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import path from 'path';
import { UploadMediaDto } from '../dto/upload-media.dto';

@Injectable()
export class MediaService {
  async upload(dto: UploadMediaDto) {
    const dir = path.join(process.cwd(), 'uploads');
    await fs.mkdir(dir, { recursive: true });
    const safeName = `${Date.now()}-${dto.fileName}`;
    const filePath = path.join(dir, safeName);
    const buf = Buffer.from(dto.contentBase64, 'base64');
    await fs.writeFile(filePath, buf);
    return { url: `/uploads/${safeName}`, mimeType: dto.mimeType, size: buf.byteLength };
  }
}
