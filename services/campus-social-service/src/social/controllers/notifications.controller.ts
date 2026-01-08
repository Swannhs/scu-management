import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { Roles } from 'nest-keycloak-connect';
import { Request } from 'express';
import { TenantContextParam } from '../../common/tenant-context.decorator';
import { TenantContext } from '../../common/tenant-context';
import { NotificationsService } from '../services/notifications.service';

@Controller('v1/notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async listNotifications(
    @TenantContextParam() tenantContext: TenantContext,
    @Req() req: Request,
  ) {
    const userId = req.user?.sub as string;
    return this.notificationsService.listNotifications(tenantContext.effectiveTenantId, userId);
  }

  @Post(':id/read')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async markRead(
    @TenantContextParam() tenantContext: TenantContext,
    @Req() req: Request,
    @Param('id') notificationId: string,
  ) {
    const userId = req.user?.sub as string;
    return this.notificationsService.markRead(tenantContext.effectiveTenantId, userId, notificationId);
  }
}
