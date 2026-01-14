import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class OutboxService {
  constructor(private readonly prisma: PrismaService) {}

  async createEvent(
    tx: Prisma.TransactionClient,
    data: {
      tenantId: string;
      eventType: string;
      payload: any;
    },
  ) {
    return tx.eventOutbox.create({
      data: {
        tenantId: data.tenantId,
        eventType: data.eventType,
        payload: data.payload,
      },
    });
  }
}
