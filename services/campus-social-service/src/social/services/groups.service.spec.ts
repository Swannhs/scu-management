import { BadRequestException } from '@nestjs/common';
import { GroupType } from '@prisma/client';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { GroupsService } from './groups.service';

describe('GroupsService', () => {
  const prisma = {
    group: { create: jest.fn(), findMany: jest.fn(), findFirst: jest.fn() },
    groupMember: { create: jest.fn(), upsert: jest.fn(), update: jest.fn() },
  } as any;

  let service: GroupsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [GroupsService, { provide: PrismaService, useValue: prisma }],
    }).compile();
    service = module.get(GroupsService);
    jest.clearAllMocks();
  });

  it('allows only CLUB groups to be created manually', async () => {
    await expect(
      service.createGroup('t1', 'u1', { type: GroupType.COURSE, name: 'x', visibility: 'PRIVATE' } as any, ['STUDENT']),
    ).rejects.toThrow(BadRequestException);
  });

  it('joins group', async () => {
    prisma.groupMember.upsert.mockResolvedValue({ id: 'm1' });
    const result = await service.joinGroup('t1', 'g1', 'u1');
    expect(result.id).toBe('m1');
  });
});


  it('private group join -> pending -> approve -> active', async () => {
    prisma.group.findFirst.mockResolvedValue({ id: 'g1', visibility: 'PRIVATE' });
    prisma.groupMember.upsert.mockResolvedValue({ id: 'm1', status: 'PENDING' });
    prisma.groupMember.update.mockResolvedValue({ id: 'm1', status: 'ACTIVE' });

    const pending = await service.joinGroup('t1', 'g1', 'u1');
    expect(pending.status).toBe('PENDING');
    const active = await service.approveJoinRequest('t1', 'g1', 'u1');
    expect(active.status).toBe('ACTIVE');
  });
