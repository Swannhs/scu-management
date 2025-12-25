import { Injectable } from '@nestjs/common';
import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ProxyService {
    private readonly routes = {
        '/api/auth': 'http://user-auth-service:3000',
        '/api/students': 'http://student-service:3000',
        '/api/courses': 'http://course-service:3000',
        '/api/finance': 'http://finance-service:8080',
        '/api/admin': 'http://admin-config-service:80',
    };

    handle(req: Request, res: Response, next: NextFunction) {
        const path = req.path;
        const target = Object.entries(this.routes).find(([prefix]) => path.startsWith(prefix));

        if (target) {
            const [prefix, targetUrl] = target;
            const proxy = createProxyMiddleware({
                target: targetUrl,
                changeOrigin: true,
                pathRewrite: {
                    [`^${prefix}`]: '', // Strip prefix if needed, or keep it depending on downstream config
                },
            });
            return proxy(req, res, next);
        }

        next();
    }
}
