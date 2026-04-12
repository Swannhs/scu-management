import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { authMiddleware, AuthenticatedRequest } from './middleware/auth.middleware';
import { tenantMiddleware } from './middleware/tenant.middleware';
import { rateLimitMiddleware } from './middleware/rate-limit.middleware';
import {
  getServiceByName,
  getServiceConfig,
  services,
  type ServiceConfig,
} from './config/services.config';
import { buildCombinedSpec, writeCombinedSpec } from './openapi/openapi-merge';

const PORT = Number(process.env.PORT || 3000);
const OPENAPI_BASE_DIR = path.resolve(process.cwd());

function createServiceProxy(service: ServiceConfig, rewritePath: (reqPath: string) => string) {
  return createProxyMiddleware({
    target: service.url,
    changeOrigin: true,
    ws: true,
    pathRewrite: (_path, req) => rewritePath(req.originalUrl),
    onProxyReq: (proxyReq, req: AuthenticatedRequest) => {
      if (req.tenantId) {
        proxyReq.setHeader('x-tenant-id', req.tenantId);
      }
      if (req.user) {
        proxyReq.setHeader('x-user-id', req.user.userId);
        proxyReq.setHeader('x-user-role', req.user.role);
      }
    },
    onError: (err, _req, res) => {
      res.status(503).json({
        success: false,
        error: {
          code: 'SERVICE_UNAVAILABLE',
          message: `Service ${service.name} is currently unavailable`,
          details: err.message,
        },
      });
    },
  });
}

async function getCombinedOpenApi() {
  return buildCombinedSpec(OPENAPI_BASE_DIR);
}

export function createGatewayApp() {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(compression());
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));

  app.use(rateLimitMiddleware);

  app.get('/health', (_req: Request, res: Response) => {
    res.json({
      success: true,
      data: {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        service: 'api-gateway',
      },
    });
  });

  app.get('/api-docs/openapi.json', async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const spec = await getCombinedOpenApi();
      res.json(spec);
    } catch (error) {
      next(error);
    }
  });

  app.post('/api-docs/rebuild', async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const outputPath = await writeCombinedSpec(OPENAPI_BASE_DIR);
      res.json({
        success: true,
        data: {
          outputPath,
        },
      });
    } catch (error) {
      next(error);
    }
  });

  app.get('/api-docs', (_req: Request, res: Response) => {
    const html = `<!DOCTYPE html><html><head><title>Unified API Docs</title><script src="https://cdn.jsdelivr.net/npm/redoc@next/bundles/redoc.standalone.js"></script></head><body><redoc spec-url="/api-docs/openapi.json"></redoc></body></html>`;
    res.type('html').send(html);
  });

  app.use(authMiddleware);
  app.use(tenantMiddleware);

  const campusSocialService = getServiceByName('campus-social-service');
  if (campusSocialService) {
    app.use(
      '/ws',
      createServiceProxy(campusSocialService, () => '/ws'),
    );
  }

  app.use('/services/:serviceName', (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const serviceName = req.params.serviceName;
    const service = getServiceByName(serviceName);

    if (!service) {
      return next();
    }

    const proxy = createServiceProxy(service, (reqPath) => {
      const prefix = `/services/${serviceName}`;
      const rewritten = reqPath.startsWith(prefix) ? reqPath.slice(prefix.length) : reqPath;
      return rewritten || '/';
    });

    return proxy(req, res, next);
  });

  services.forEach((service) => {
    const proxy = createServiceProxy(service, (reqPath) => reqPath);
    app.use(service.path, proxy);
  });

  app.use((req: Request, res: Response) => {
    const serviceConfig = getServiceConfig(req.path);
    const hint = serviceConfig
      ? `Try ${req.path} via ${serviceConfig.name} or /services/${serviceConfig.name}${req.path}.`
      : 'No service mapping found for this path.';

    res.status(404).json({
      success: false,
      error: {
        code: 'NOT_FOUND',
        message: `Route ${req.method} ${req.path} not found`,
        details: hint,
      },
    });
  });

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    res.status(err.status || 500).json({
      success: false,
      error: {
        code: err.code || 'INTERNAL_ERROR',
        message: err.message || 'Internal server error',
      },
    });
  });

  return app;
}

if (require.main === module) {
  const app = createGatewayApp();
  app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
    console.log(`API Documentation: http://localhost:${PORT}/api-docs`);
    console.log(`OpenAPI JSON: http://localhost:${PORT}/api-docs/openapi.json`);
    console.log(`Health Check: http://localhost:${PORT}/health`);
  });
}
