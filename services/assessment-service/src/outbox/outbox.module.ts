import { Module } from '@nestjs/common';
import { OutboxService } from './outbox.service';
import { PrismaModule } from '../prisma/prisma.module';
import { OutboxWorker } from './outbox.worker';
import { ScheduleModule } from '@nestjs/schedule';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService, ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    ScheduleModule.forRoot(),
    ClientsModule.registerAsync([
      {
        name: 'RABBITMQ_CLIENT',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [config.get<string>('RABBITMQ_URL') || 'amqp://guest:guest@rabbitmq:5672'],
            queue: 'assessment_events',
            queueOptions: {
              durable: true,
            },
          },
        }),
      },
    ]),
  ],
  providers: [OutboxService, OutboxWorker],
  exports: [OutboxService],
})
export class OutboxModule {}
