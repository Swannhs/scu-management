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
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
  </head>
  <body>
    <div id='swagger-ui'></div>
    <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
    <script>window.ui = SwaggerUIBundle({ url: '/api-docs/openapi.json', dom_id: '#swagger-ui' });</script>
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
