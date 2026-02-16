import { ForbiddenException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { FriendsService } from './friends.service';
import { OutboxService } from './outbox.service';

describe('FriendsService', () => {
  const prisma = {
    block: { findFirst: jest.fn() },
    friendship: {
      findUnique: jest.fn(),
      upsert: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findMany: jest.fn(),
    },
  } as any;

  const outbox = { publishEvent: jest.fn() };

  let service: FriendsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        FriendsService,
        { provide: PrismaService, useValue: prisma },
        { provide: OutboxService, useValue: outbox },
      ],
    }).compile();

    service = module.get(FriendsService);
    jest.clearAllMocks();
  });

  it('creates a friend request', async () => {
    prisma.friendship.findUnique.mockResolvedValue(null);
    prisma.friendship.upsert.mockResolvedValue({ id: 'req-1', status: 'PENDING' });

    const result = await service.requestFriend('t1', 'u1', { toUserId: 'u2', targetUserId: 'u2' } as any);

    expect(result.id).toBe('req-1');
    expect(outbox.publishEvent).toHaveBeenCalled();
  });

  it('forbids accepting someone else request', async () => {
    prisma.friendship.findFirst.mockResolvedValue({ id: 'r1', addresseeId: 'u2' });
    await expect(service.acceptRequest('t1', 'u3', 'r1')).rejects.toThrow(ForbiddenException);
  });
});


  it('rejects friend request to blocked user', async () => {
    prisma.block.findFirst.mockResolvedValue({ id: 'b1' });
    await expect(service.requestFriend('t1', 'u1', { toUserId: 'u2', targetUserId: 'u2' } as any)).rejects.toThrow(ForbiddenException);
  });
