import { readFile } from 'fs/promises';
import path from 'path';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function loadOpenApiSpec() {
  const specPath = path.resolve(process.cwd(), 'openapi', 'openapi.json');
  const raw = await readFile(specPath, 'utf8');
  return JSON.parse(raw);
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
