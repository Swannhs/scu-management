import { Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
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
  async listNotifications(@TenantContextParam() tenantContext: TenantContext, @Req() req: Request, @Query('unread') unread?: string, @Query('limit') limit?: string, @Query('cursor') cursor?: string) {
    return this.notificationsService.listNotifications(tenantContext.effectiveTenantId, req.user?.sub as string, unread === 'true', limit ? Number(limit) : undefined, cursor);
  }

  @Get('unread-count')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async unreadCount(@TenantContextParam() tenantContext: TenantContext, @Req() req: Request) {
    return this.notificationsService.unreadCount(tenantContext.effectiveTenantId, req.user?.sub as string);
  }

  @Post(':id/read')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async markRead(@TenantContextParam() tenantContext: TenantContext, @Req() req: Request, @Param('id') notificationId: string) {
    return this.notificationsService.markRead(tenantContext.effectiveTenantId, req.user?.sub as string, notificationId);
  }
}
