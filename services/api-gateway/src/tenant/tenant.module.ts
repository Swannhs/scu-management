import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TenantService } from './tenant.service';
import { TenantMiddleware } from './tenant.middleware';

@Module({
    imports: [HttpModule],
    providers: [TenantService],
    exports: [TenantService],
})
export class TenantModule { }
