import { Injectable, Logger, Inject } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OutboxWorker {
  private readonly logger = new Logger(OutboxWorker.name);

  constructor(
    private readonly prisma: PrismaService,
    @Inject('RABBITMQ_CLIENT') private readonly client: ClientProxy,
  ) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async processOutbox() {
    // Fetch pending events
    // We limit to 50 to avoid memory spikes
    const events = await this.prisma.eventOutbox.findMany({
      where: { status: 'PENDING' },
      take: 50,
      orderBy: { createdAt: 'asc' },
    });

    if (events.length === 0) return;

    this.logger.log(`Processing ${events.length} outbox events`);

    for (const event of events) {
      try {
        await lastValueFrom(
          this.client.emit(event.eventType, {
            eventId: event.id,
            tenantId: event.tenantId,
            occurredAt: event.createdAt.toISOString(),
            payload: event.payload,
          }),
        );

        await this.prisma.eventOutbox.update({
          where: { id: event.id },
          data: {
            status: 'PUBLISHED',
            publishedAt: new Date(),
          },
        });
      } catch (error) {
        this.logger.error(`Failed to publish event ${event.id}`, error);

        const retries = event.retries + 1;
        const status = retries > 5 ? 'FAILED' : 'PENDING';

        await this.prisma.eventOutbox.update({
          where: { id: event.id },
          data: {
            retries,
            status,
          },
        });
      }
    }
  }
}
