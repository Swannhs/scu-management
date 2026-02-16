import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import path from 'path';
import { buildCombinedSpec } from './openapi/openapi-merge';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3000;

  const baseDir = path.resolve(__dirname, '..');
  let combinedSpec = await buildCombinedSpec(baseDir);

  app.getHttpAdapter().get('/api-docs/openapi.json', (_req, res) => {
    res.json(combinedSpec);
  });

  app.getHttpAdapter().get('/api-docs', (_req, res) => {
    const html = `<!DOCTYPE html>
<html>
  <head>
    <title>Unified API Docs</title>
    <script src="https://cdn.jsdelivr.net/npm/redoc@next/bundles/redoc.standalone.js"></script>
  </head>
  <body>
    <redoc spec-url='/api-docs/openapi.json'></redoc>
  </body>
</html>`;
    res.type('html').send(html);
  });

  app.getHttpAdapter().post('/api-docs/rebuild', async (_req, res) => {
    combinedSpec = await buildCombinedSpec(baseDir);
    res.json({ status: 'ok', message: 'Combined OpenAPI spec rebuilt.' });
  });

  await app.listen(port);
  Logger.log(`API Gateway is running on: http://localhost:${port}`, 'Bootstrap');
  Logger.log(`Unified API documentation: http://localhost:${port}/api-docs`, 'Bootstrap');
}
bootstrap();
