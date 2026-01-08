import { Controller, Get, Post, Param } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TenantId } from '../common/decorators/tenant.decorator';
import { User } from '../common/decorators/user.decorator';

@Controller('v1/notifications')
export class NotificationsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getNotifications(@User() user: any, @TenantId() tenantId: string) {
    return this.prisma.notification.findMany({
        where: { tenantId, userId: user.sub },
        orderBy: { createdAt: 'desc' }
    });
  }

  @Post(':id/read')
  async markRead(@Param('id') id: string, @TenantId() tenantId: string) {
    return this.prisma.notification.update({
        where: { id },
        data: { readAt: new Date() }
    });
  }
}
