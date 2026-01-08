import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OutboxService {
  constructor(private readonly prisma: PrismaService) {}

  async publishEvent(tenantId: string, eventType: string, payload: Record<string, unknown>) {
    return this.prisma.eventOutbox.create({
      data: {
        tenantId,
        eventType,
        payload,
      },
    });
  }
}
