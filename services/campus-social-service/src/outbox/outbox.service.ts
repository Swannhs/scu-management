import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OutboxService {
  constructor(private readonly prisma: PrismaService) {}

  async emit(tenantId: string, eventType: string, payload: any) {
    await this.prisma.eventOutbox.create({
      data: {
        tenantId,
        eventType,
        payload,
        status: 'PENDING',
      },
    });
  }
}
