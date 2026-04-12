import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Roles } from 'nest-keycloak-connect';
import { TenantContextParam } from '../common/tenant-context.decorator';
import type { TenantContext } from '../common/tenant-context';
import { ApplicationsService } from './applications.service';
import { UpdateApplicationStatusDto } from './dto/update-application-status.dto';
import { CreateOfferDto } from './dto/create-offer.dto';

@Controller('v1/applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Get('my')
  @Roles({ roles: ['STUDENT'] })
  async findMyApplications(@TenantContextParam() tenantContext: TenantContext) {
    return this.applicationsService.findMyApplications(
      tenantContext.effectiveTenantId,
      tenantContext.actorId,
    );
  }

  @Get()
  @Roles({ roles: ['TENANT_ADMIN', 'REGISTRAR', 'STAFF'] })
  async findAll(@TenantContextParam() tenantContext: TenantContext) {
    return this.applicationsService.findAll(tenantContext.effectiveTenantId);
  }

  @Patch(':id/status')
  @Roles({ roles: ['TENANT_ADMIN', 'REGISTRAR', 'STAFF'] })
  async updateStatus(
    @Param('id') id: string,
    @Body() data: UpdateApplicationStatusDto,
    @TenantContextParam() tenantContext: TenantContext,
  ) {
    return this.applicationsService.updateStatus(
      tenantContext.effectiveTenantId,
      id,
      data,
    );
  }

  @Post(':id/offer')
  @Roles({ roles: ['TENANT_ADMIN', 'REGISTRAR', 'STAFF'] })
  async createOffer(
    @Param('id') applicationId: string,
    @Body() data: CreateOfferDto,
    @TenantContextParam() tenantContext: TenantContext,
  ) {
    return this.applicationsService.createOffer(
      tenantContext.effectiveTenantId,
      applicationId,
      data,
    );
  }
}
