import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { UploadMediaDto } from '../dto/upload-media.dto';
import { randomUUID } from 'crypto';

interface DocumentServiceContext {
  authorization?: string;
  tenantId: string;
  userId?: string;
}

interface InitiateUploadResponse {
  fileId: string;
  uploadUrl: string;
}

@Injectable()
export class MediaService {
  constructor(private readonly httpService: HttpService) {}

  async upload(
    tenantId: string,
    _uploadedBy: string,
    dto: UploadMediaDto,
    context: DocumentServiceContext,
  ) {
    const buf = Buffer.from(dto.contentBase64, 'base64');
    const documentServiceBaseUrl = (
      process.env.DOCUMENT_SERVICE_URL || 'http://document-service:3000'
    ).replace(/\/$/, '');
    const headers = this.buildForwardHeaders(context);

    const initiateResponse = await firstValueFrom(
      this.httpService.post<InitiateUploadResponse>(
        `${documentServiceBaseUrl}/v1/files/initiate-upload`,
        {
          filename: dto.fileName,
          mimeType: dto.mimeType,
          sizeBytes: buf.byteLength,
          ownerService: 'campus-social-service',
          ownerEntityId: randomUUID(),
        },
        { headers },
      ),
    );
    const initiated = initiateResponse.data;

    const uploadUrl = this.resolveServiceUrl(documentServiceBaseUrl, initiated.uploadUrl);
    await firstValueFrom(
      this.httpService.put(uploadUrl, buf, {
        headers: {
          ...headers,
          'content-type': dto.mimeType,
          'content-length': String(buf.byteLength),
        },
      }),
    );

    await firstValueFrom(
      this.httpService.post(
        `${documentServiceBaseUrl}/v1/files/complete-upload`,
        { fileId: initiated.fileId },
        { headers },
      ),
    );

    return {
      fileId: initiated.fileId,
      url: `${documentServiceBaseUrl}/v1/files/${initiated.fileId}/content`,
      mimeType: dto.mimeType,
      size: buf.byteLength,
      tenantId,
    };
  }

  private buildForwardHeaders(context: DocumentServiceContext) {
    return {
      ...(context.authorization ? { Authorization: context.authorization } : {}),
      'X-Tenant-ID': context.tenantId,
      ...(context.userId ? { 'X-User-ID': context.userId } : {}),
    };
  }

  private resolveServiceUrl(baseUrl: string, maybeRelativeUrl: string) {
    if (/^https?:\/\//.test(maybeRelativeUrl)) {
      return maybeRelativeUrl;
    }

    if (maybeRelativeUrl.startsWith('/')) {
      return `${baseUrl}${maybeRelativeUrl}`;
    }

    return `${baseUrl}/${maybeRelativeUrl}`;
  }
}
