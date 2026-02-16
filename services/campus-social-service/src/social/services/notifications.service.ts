import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async listNotifications(tenantId: string, userId: string, unread = false, limit = 50, cursor?: string) {
    const items = await this.prisma.notification.findMany({
      where: { tenantId, userId, ...(unread ? { readAt: null } : {}) },
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      take: limit + 1,
      ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
    });
    const hasNext = items.length > limit;
    const sliced = hasNext ? items.slice(0, limit) : items;
    return { items: sliced, nextCursor: hasNext ? sliced[sliced.length - 1].id : null };
  }

  async unreadCount(tenantId: string, userId: string) {
    return { count: await this.prisma.notification.count({ where: { tenantId, userId, readAt: null } }) };
  }

  async markRead(tenantId: string, userId: string, notificationId: string) {
    return this.prisma.notification.updateMany({ where: { tenantId, userId, id: notificationId }, data: { readAt: new Date() } });
  }
}
