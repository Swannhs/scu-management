import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async listNotifications(tenantId: string, userId: string, unread = false, limit = 50) {
    return this.prisma.notification.findMany({
      where: { tenantId, userId, ...(unread ? { readAt: null } : {}) },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  async markRead(tenantId: string, userId: string, notificationId: string) {
    return this.prisma.notification.updateMany({
      where: { tenantId, userId, id: notificationId },
      data: { readAt: new Date() },
    });
  }
}
