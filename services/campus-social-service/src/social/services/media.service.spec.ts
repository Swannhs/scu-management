import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { MediaService } from './media.service';

describe('MediaService', () => {
  const httpService = {
    post: jest.fn(),
    put: jest.fn(),
  } as unknown as HttpService;

  let service: MediaService;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.DOCUMENT_SERVICE_URL = 'http://document-service:3000';
    service = new MediaService(httpService);
  });

  afterEach(() => {
    delete process.env.DOCUMENT_SERVICE_URL;
  });

  it('uploads media through document-service lifecycle', async () => {
    (httpService.post as jest.Mock)
      .mockReturnValueOnce(of({ data: { fileId: 'file-1', uploadUrl: '/v1/files/file-1/content' } }))
      .mockReturnValueOnce(of({ data: { status: 'active' } }));
    (httpService.put as jest.Mock).mockReturnValue(of({ data: {} }));

    const result = await service.upload(
      'tenant-1',
      'user-1',
      {
        fileName: 'image.png',
        mimeType: 'image/png',
        contentBase64: Buffer.from('hello').toString('base64'),
      },
      {
        authorization: 'Bearer token',
        tenantId: 'tenant-1',
        userId: 'user-1',
      },
    );

    expect(httpService.post).toHaveBeenNthCalledWith(
      1,
      'http://document-service:3000/v1/files/initiate-upload',
      expect.objectContaining({
        filename: 'image.png',
        mimeType: 'image/png',
        ownerService: 'campus-social-service',
      }),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer token',
          'X-Tenant-ID': 'tenant-1',
          'X-User-ID': 'user-1',
        }),
      }),
    );
    expect(httpService.put).toHaveBeenCalledWith(
      'http://document-service:3000/v1/files/file-1/content',
      expect.any(Buffer),
      expect.objectContaining({
        headers: expect.objectContaining({
          'content-type': 'image/png',
        }),
      }),
    );
    expect(httpService.post).toHaveBeenNthCalledWith(
      2,
      'http://document-service:3000/v1/files/complete-upload',
      { fileId: 'file-1' },
      expect.any(Object),
    );
    expect(result).toEqual({
      fileId: 'file-1',
      url: 'http://document-service:3000/v1/files/file-1/content',
      mimeType: 'image/png',
      size: 5,
      tenantId: 'tenant-1',
    });
  });

  it('surfaces initiate-upload failures', async () => {
    (httpService.post as jest.Mock).mockReturnValueOnce(
      throwError(() => new Error('document-service unavailable')),
    );

    await expect(
      service.upload(
        'tenant-1',
        'user-1',
        {
          fileName: 'image.png',
          mimeType: 'image/png',
          contentBase64: Buffer.from('hello').toString('base64'),
        },
        {
          authorization: 'Bearer token',
          tenantId: 'tenant-1',
          userId: 'user-1',
        },
      ),
    ).rejects.toThrow('document-service unavailable');
  });
});
