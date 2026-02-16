import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import path from 'path';
import { UploadMediaDto } from '../dto/upload-media.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MediaService {
  constructor(private readonly prisma: PrismaService) {}

  async upload(tenantId: string, uploadedBy: string, dto: UploadMediaDto) {
    const dir = path.join(process.cwd(), 'uploads', tenantId);
    await fs.mkdir(dir, { recursive: true });

    const safeName = `${Date.now()}-${dto.fileName}`;
    const filePath = path.join(dir, safeName);
    const buf = Buffer.from(dto.contentBase64, 'base64');

    await fs.writeFile(filePath, buf);

    const file = await (this.prisma as any).mediaFile.create({
      data: {
        tenantId,
        uploadedBy,
        url: `/uploads/${tenantId}/${safeName}`,
        mimeType: dto.mimeType,
        size: buf.byteLength,
      },
    });

    return {
      fileId: file.id,
      url: file.url,
      mimeType: file.mimeType,
      size: file.size,
      tenantId: file.tenantId,
    };
  }
}
