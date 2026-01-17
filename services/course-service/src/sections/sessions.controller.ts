import { Controller, Get, Req } from '@nestjs/common';
import { Roles } from 'nest-keycloak-connect';
import { Request } from 'express';
import { TenantContextParam } from '../common/tenant-context.decorator';
import { TenantContext } from '../common/tenant-context';
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
}
