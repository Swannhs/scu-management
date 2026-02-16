import { Test } from '@nestjs/testing';
import { CallsService } from './calls.service';
import { PrismaService } from '../../prisma/prisma.service';
import { OutboxService } from './outbox.service';

describe('CallsService', () => {
  const prisma = { callParticipant: { upsert: jest.fn(), findMany: jest.fn(), updateMany: jest.fn() }, notification: { create: jest.fn() } } as any;
  const outbox = { publishEvent: jest.fn() };
  let service: CallsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({ providers: [CallsService, { provide: PrismaService, useValue: prisma }, { provide: OutboxService, useValue: outbox }] }).compile();
    service = module.get(CallsService);
    jest.clearAllMocks();
  });

  it('tracks participants in room', async () => {
    await service.createRoom('t1', 'u1', 'DM', 'target');
    await service.joinRoom('t1', 'u2', 'dm-target');
    prisma.callParticipant.findMany.mockResolvedValue([{ userId: 'u1' }, { userId: 'u2' }]);
    const participants = await service.participants('t1', 'dm-target');
    expect(participants).toHaveLength(2);
  });
});
