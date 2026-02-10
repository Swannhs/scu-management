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
  paths: {},
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
  app.getHttpAdapter().get('/api-docs', (_req, res) => {
    const html = `<!DOCTYPE html><html><head><title>Campus Social API Docs</title><script src="https://cdn.jsdelivr.net/npm/redoc@next/bundles/redoc.standalone.js"></script></head><body><redoc spec-url='/openapi.json'></redoc></body></html>`;
    res.type('html').send(html);
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
