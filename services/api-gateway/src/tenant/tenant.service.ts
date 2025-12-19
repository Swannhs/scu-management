import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TenantService {
    private readonly logger = new Logger(TenantService.name);

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
        @InjectRedis() private readonly redis: Redis,
    ) { }

    async resolveTenantId(hostname: string): Promise<string | null> {
        // 1. Check Cache
        const cachedId = await this.redis.get(`tenant:domain:${hostname}`);
        if (cachedId) return cachedId;

        // 2. Call Admin Config Service
        try {
            const adminUrl = this.configService.get('ADMIN_CONFIG_SERVICE_URL');
            const response = await firstValueFrom(
                this.httpService.get(`${adminUrl}/api/resolve-domain?hostname=${hostname}`),
            );

            const tenantId = response.data?.tenant_id;
            if (tenantId) {
                // Cache for 1 hour
                await this.redis.set(`tenant:domain:${hostname}`, tenantId, 'EX', 3600);
                return tenantId;
            }
        } catch (error) {
            this.logger.error(`Failed to resolve tenant for hostname: ${hostname}`, error.stack);
        }

        return null;
    }
}
