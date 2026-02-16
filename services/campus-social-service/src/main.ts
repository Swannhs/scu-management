import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

const OPENAPI_SPEC = {
  openapi: '3.0.3',
  info: {
    title: 'Campus Social Service API',
    version: '1.0.0',
    description: 'Tenant-aware social APIs',
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    parameters: {
      TenantIdHeader: {
        name: 'X-Tenant-ID',
        in: 'header',
        required: true,
        schema: { type: 'string' },
      },
    },
  },
  security: [{ bearerAuth: [] }],

  paths: {
    '/v1/feed': { get: { summary: 'Feed' } },
    '/v1/posts': { post: { summary: 'Create post' }, get: { summary: 'List posts' } },
    '/v1/posts/{id}': { get: { summary: 'Get post' }, patch: { summary: 'Update post' }, delete: { summary: 'Delete post' } },
    '/v1/posts/{id}/comments': { get: { summary: 'List comments' }, post: { summary: 'Create comment' } },
    '/v1/groups': { get: { summary: 'List groups' }, post: { summary: 'Create group' } },
    '/v1/groups/{id}/join': { post: { summary: 'Join group' } },
    '/v1/groups/{id}/requests': { get: { summary: 'List join requests' } },
    '/v1/friends/block': { post: { summary: 'Block user' } },
    '/v1/conversations/{id}/messages': { get: { summary: 'List messages' }, post: { summary: 'Send message' } },
    '/v1/conversations/{id}/read': { post: { summary: 'Mark read' } },
    '/v1/calls/rooms/{roomId}/participants': { get: { summary: 'List call participants' } },
    '/v1/notifications': { get: { summary: 'List notifications' } },
    '/v1/notifications/unread-count': { get: { summary: 'Unread count' } },
    '/v1/media/upload': { post: { summary: 'Upload media' } },
    '/v1/reports': { post: { summary: 'Create report' } },
    '/v1/moderation/reports': { get: { summary: 'List moderation reports' } },
    '/v1/directory/users': { get: { summary: 'Directory search' } },
  },
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.getHttpAdapter().get('/openapi.json', (_req, res) => res.json(OPENAPI_SPEC));
  app.getHttpAdapter().get('/api-docs-json', (_req, res) => res.json(OPENAPI_SPEC));
  app.getHttpAdapter().get('/api-docs', (_req, res) => {
    const html = `<!DOCTYPE html><html><head><title>Campus Social API Docs</title><script src="https://cdn.jsdelivr.net/npm/redoc@next/bundles/redoc.standalone.js"></script></head><body><redoc spec-url='/openapi.json'></redoc></body></html>`;
    res.type('html').send(html);
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
