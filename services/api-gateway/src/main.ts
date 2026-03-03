import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { createProxyMiddleware } from 'http-proxy-middleware';
import swaggerUi from 'swagger-ui-express';
import { authMiddleware, AuthenticatedRequest } from './middleware/auth.middleware';
import { tenantMiddleware } from './middleware/tenant.middleware';
import { rateLimitMiddleware } from './middleware/rate-limit.middleware';
import { services, getServiceConfig } from './config/services.config';

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
app.use(rateLimitMiddleware);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'api-gateway',
    },
  });
});

// Swagger documentation
const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'University Management System API',
    version: '1.0.0',
    description: 'Multi-tenant University Management System API Gateway',
  },
  servers: [
    {
      url: `http://localhost:${PORT}`,
      description: 'Local server',
    },
  ],
  paths: {},
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Auth middleware
app.use(authMiddleware);

// Tenant middleware for protected routes
app.use(tenantMiddleware);

// Setup proxy middleware for each service
services.forEach((service) => {
  const proxyMiddleware = createProxyMiddleware({
    target: service.url,
    changeOrigin: true,
    pathRewrite: {
      [`^${service.path}`]: service.path,
    },
    onProxyReq: (proxyReq, req: AuthenticatedRequest) => {
      // Add tenant and user info to proxied request
      if (req.tenantId) {
        proxyReq.setHeader('x-tenant-id', req.tenantId);
      }
      if (req.user) {
        proxyReq.setHeader('x-user-id', req.user.userId);
        proxyReq.setHeader('x-user-role', req.user.role);
      }
    },
    onError: (err, req, res) => {
      console.error(`Proxy error for ${service.path}:`, err.message);
      res.status(503).json({
        success: false,
        error: {
          code: 'SERVICE_UNAVAILABLE',
          message: `Service ${service.name} is currently unavailable`,
        },
      });
    },
  });

  app.use(service.path, proxyMiddleware);
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.method} ${req.path} not found`,
    },
  });
});

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Gateway error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: {
      code: err.code || 'INTERNAL_ERROR',
      message: err.message || 'Internal server error',
    },
  });
});

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
  console.log(`API Documentation: http://localhost:${PORT}/api-docs`);
  console.log(`Health Check: http://localhost:${PORT}/health`);
});
