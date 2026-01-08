import { Body, Controller, Post } from '@nestjs/common';
import { Roles } from 'nest-keycloak-connect';
import { TenantContextParam } from '../../common/tenant-context.decorator';
import { TenantContext } from '../../common/tenant-context';
import { EventIngestDto } from '../dto/event-ingest.dto';
import { EventsService } from '../services/events.service';

@Controller('v1/events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @Roles({ roles: ['TENANT_ADMIN'] })
  async ingestEvent(
    @TenantContextParam() tenantContext: TenantContext,
    @Body() dto: EventIngestDto,
  ) {
    return this.eventsService.handleEvent(tenantContext.effectiveTenantId, dto.eventType, dto.payload);
  }
}
