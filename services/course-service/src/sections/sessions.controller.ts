import { Controller, Get, Req, Query } from '@nestjs/common';
import { Roles } from 'nest-keycloak-connect';
import type { Request } from 'express';
import { TenantContextParam } from '../common/tenant-context.decorator';
import type { TenantContext } from '../common/tenant-context';
import { SectionsService } from './sections.service';

@Controller('v1/sessions')
export class SessionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Get()
  @Roles({ roles: ['FACULTY'] })
  async getMySessions(
    @TenantContextParam() tenantContext: TenantContext,
    @Req() req: Request,
  ) {
    const userId = (req as any).user?.sub as string;
    return this.sectionsService.getSessionsForFaculty(tenantContext.effectiveTenantId, userId);
  }

  @Get('list')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN', 'REGISTRAR'] })
  async getSessionsBySectionIds(
    @TenantContextParam() tenantContext: TenantContext,
    @Query('sectionIds') sectionIds: string,
  ) {
    if (!sectionIds) return [];
    const ids = sectionIds.split(',');
    return this.sectionsService.getSessionsBySectionIds(tenantContext.effectiveTenantId, ids);
  }
}
