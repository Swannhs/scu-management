import { readFile } from 'fs/promises';
import path from 'path';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

let openApiSpecCache: unknown;

async function loadOpenApiSpec() {
  if (openApiSpecCache) {
    return openApiSpecCache;
  }

  const candidates = [
    path.resolve(process.cwd(), 'openapi', 'openapi.json'),
    path.resolve(__dirname, '..', 'openapi', 'openapi.json'),
  ];

  for (const specPath of candidates) {
    try {
      const raw = await readFile(specPath, 'utf8');
      openApiSpecCache = JSON.parse(raw);
      return openApiSpecCache;
    } catch {
      // try next candidate
    }
  }

  throw new Error('Unable to load openapi/openapi.json for campus-social-service');
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.getHttpAdapter().get('/openapi.json', async (_req, res) => {
    res.json(await loadOpenApiSpec());
  });
  app.getHttpAdapter().get('/api-docs-json', async (_req, res) => {
    res.json(await loadOpenApiSpec());
  });
  app.getHttpAdapter().get('/api-docs', (_req, res) => {
    const html = `<!DOCTYPE html><html><head><title>Campus Social API Docs</title><script src="https://cdn.jsdelivr.net/npm/redoc@next/bundles/redoc.standalone.js"></script></head><body><redoc spec-url='/openapi.json'></redoc></body></html>`;
    res.type('html').send(html);
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
