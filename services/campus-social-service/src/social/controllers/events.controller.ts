import { Body, Controller, Headers, Post, UnauthorizedException } from '@nestjs/common';
import { Roles } from 'nest-keycloak-connect';
import { TenantContextParam } from '../../common/tenant-context.decorator';
import type { TenantContext } from '../../common/tenant-context';
import { EventIngestDto } from '../dto/event-ingest.dto';
import { EventsService } from '../services/events.service';

@Controller('v1/events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @Roles({ roles: ['TENANT_ADMIN'] })
  async ingestEvent(@TenantContextParam() tenantContext: TenantContext, @Body() dto: EventIngestDto, @Headers('x-social-event-secret') secret?: string) {
    if (process.env.SOCIAL_EVENT_INGEST_SECRET && secret !== process.env.SOCIAL_EVENT_INGEST_SECRET) {
      throw new UnauthorizedException('Invalid event ingest secret');
    }
    return this.eventsService.handleEvent(tenantContext.effectiveTenantId, dto.eventType, dto.payload);
  }
}
