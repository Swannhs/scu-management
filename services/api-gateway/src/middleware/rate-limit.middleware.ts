import { Request, Response, NextFunction } from 'express';
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

const RATE_LIMIT_WINDOW = 60; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 100; // requests per window

export async function rateLimitMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const clientId =
    (req.headers['x-tenant-id'] as string) || req.ip || 'anonymous';
  const key = `rate_limit:${clientId}`;

  try {
    const current = await redis.incr(key);

    if (current === 1) {
      await redis.expire(key, RATE_LIMIT_WINDOW);
    }

    const ttl = await redis.ttl(key);

    res.setHeader('X-RateLimit-Limit', RATE_LIMIT_MAX_REQUESTS);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, RATE_LIMIT_MAX_REQUESTS - current));
    res.setHeader('X-RateLimit-Reset', ttl);

    if (current > RATE_LIMIT_MAX_REQUESTS) {
      return res.status(429).json({
        success: false,
        error: {
          code: 'RATE_LIMIT_EXCEEDED',
          message: 'Too many requests, please try again later',
        },
      });
    }

    next();
  } catch (error) {
    // If Redis fails, allow the request
    next();
  }
}
