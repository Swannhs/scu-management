import { BadRequestException, CanActivate, ExecutionContext, INestApplication, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { MediaController } from '../src/social/controllers/media.controller';
import { MediaService } from '../src/social/services/media.service';
import { TenantAuthGuard } from '../src/common/guards/tenant-auth.guard';

class MockAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const auth = req.headers.authorization as string | undefined;
    if (!auth?.startsWith('Bearer test.')) {
      throw new BadRequestException('Authentication required');
    }
    const payload = JSON.parse(Buffer.from(auth.slice('Bearer test.'.length), 'base64url').toString('utf8'));
    req.user = payload;
    return true;
  }
}

describe('Media tenant scoping (e2e)', () => {
  let app: INestApplication;

  const mediaService = {
    upload: jest.fn(async (tenantId: string, _userId: string, _dto: any, context: any) => ({
      fileId: 'f1',
      url: `http://document-service:3000/v1/files/f1/content`,
      tenantId,
      authHeader: context.authorization,
    })),
  };

  @Module({ controllers: [MediaController], providers: [{ provide: MediaService, useValue: mediaService }] })
  class MediaTestModule {}

  const token = (sub: string, tenantId: string) =>
    `test.${Buffer.from(JSON.stringify({ sub, tenant_id: tenantId, realm_access: { roles: ['STUDENT'] } })).toString('base64url')}`;

  beforeAll(async () => {
    const mod = await Test.createTestingModule({
      imports: [MediaTestModule],
      providers: [
        { provide: APP_GUARD, useClass: MockAuthGuard },
        { provide: APP_GUARD, useClass: TenantAuthGuard },
      ],
    }).compile();

    app = mod.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const body = { fileName: 'x.png', mimeType: 'image/png', contentBase64: Buffer.from('a').toString('base64') };

  it('returns 400 with missing X-Tenant-ID', async () => {
    await request(app.getHttpServer())
      .post('/v1/media/upload')
      .set('Authorization', `Bearer ${token('u1', 'tenant-1')}`)
      .send(body)
      .expect(400);
  });

  it('returns 403 with tenant mismatch', async () => {
    await request(app.getHttpServer())
      .post('/v1/media/upload')
      .set('Authorization', `Bearer ${token('u1', 'tenant-1')}`)
      .set('X-Tenant-ID', 'tenant-2')
      .send(body)
      .expect(403);
  });

  it('returns 201 with matched tenant', async () => {
    await request(app.getHttpServer())
      .post('/v1/media/upload')
      .set('Authorization', `Bearer ${token('u1', 'tenant-1')}`)
      .set('X-Tenant-ID', 'tenant-1')
      .send(body)
      .expect(201)
      .expect((res) => {
        expect(res.body.data.fileId).toBe('f1');
        expect(res.body.data.url).toBe('http://document-service:3000/v1/files/f1/content');
        expect(res.body.data.tenantId).toBe('tenant-1');
      });

    expect(mediaService.upload).toHaveBeenCalledWith(
      'tenant-1',
      'u1',
      body,
      expect.objectContaining({
        authorization: `Bearer ${token('u1', 'tenant-1')}`,
        tenantId: 'tenant-1',
        userId: 'u1',
      }),
    );
  });
});
