import { Test, TestingModule } from '@nestjs/testing';
import { ConversationsService } from './conversations.service';
import { PrismaService } from '../../prisma/prisma.service';
import { OutboxService } from './outbox.service';
import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { ConversationMemberRole } from '@prisma/client';

describe('ConversationsService', () => {
  let service: ConversationsService;
  let prisma: PrismaService;

  const mockTx = {
    conversation: {
      create: jest.fn(),
    },
    conversationMember: {
      create: jest.fn(),
      createMany: jest.fn(),
    },
  };

  const mockPrisma = {
    conversation: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn(),
    },
    conversationMember: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn(),
      createMany: jest.fn(),
      delete: jest.fn(),
    },
    message: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
    profilePublic: {
      findMany: jest.fn(),
    },
    $transaction: jest.fn((callback) => callback(mockTx)),
  };

  const mockOutbox = {
    publishEvent: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConversationsService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: OutboxService, useValue: mockOutbox },
      ],
    }).compile();

    service = module.get<ConversationsService>(ConversationsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('createGroupConversation', () => {
    it('should create a group conversation with admin and members', async () => {
      const tenantId = 'tenant1';
      const actorId = 'user1';
      const dto = {
        name: 'Test Group',
        recipientIds: ['user2', 'user3'],
      };

      const mockConversation = { id: 'conv1', type: 'GROUP', tenantId };
      mockTx.conversation.create.mockResolvedValue(mockConversation);
      mockPrisma.profilePublic.findMany.mockResolvedValue([
          { userId: 'user2' }, { userId: 'user3' }
      ]);

      const result = await service.createGroupConversation(tenantId, actorId, dto);

      expect(mockPrisma.$transaction).toHaveBeenCalled();
      expect(mockTx.conversation.create).toHaveBeenCalledWith({
        data: {
          tenantId,
          type: 'GROUP',
          name: dto.name,
        },
      });
      // Creator is ADMIN
      expect(mockTx.conversationMember.create).toHaveBeenCalledWith({
        data: {
          tenantId,
          conversationId: 'conv1',
          userId: actorId,
          role: ConversationMemberRole.ADMIN,
        },
      });
      // Others are MEMBER
      expect(mockTx.conversationMember.createMany).toHaveBeenCalledWith({
        data: [
          { tenantId, conversationId: 'conv1', userId: 'user2', role: ConversationMemberRole.MEMBER },
          { tenantId, conversationId: 'conv1', userId: 'user3', role: ConversationMemberRole.MEMBER },
        ],
      });
      expect(result).toEqual(mockConversation);
    });

    it('should fail if less than 3 members', async () => {
      await expect(
        service.createGroupConversation('t1', 'u1', { recipientIds: ['u2'] }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should fail if recipients do not exist in tenant', async () => {
        mockPrisma.profilePublic.findMany.mockResolvedValue([]);
        await expect(service.createGroupConversation('t1', 'u1', { recipientIds: ['u2', 'u3'] }))
             .rejects.toThrow(BadRequestException);
    });
  });

  describe('addMembers', () => {
    it('should add members if actor is admin', async () => {
      const tenantId = 't1';
      const actorId = 'admin1';
      const convId = 'c1';
      const dto = { userIds: ['u3', 'u4'] };

      mockPrisma.conversation.findFirst.mockResolvedValue({ id: convId, type: 'GROUP' });
      mockPrisma.conversationMember.findFirst.mockResolvedValue({ role: ConversationMemberRole.ADMIN });
      mockPrisma.conversationMember.findMany.mockResolvedValue([]); // No existing members from the list
      mockPrisma.profilePublic.findMany.mockResolvedValue([
          { userId: 'u3' }, { userId: 'u4' }
      ]);

      await service.addMembers(tenantId, actorId, convId, dto);

      expect(mockPrisma.conversationMember.createMany).toHaveBeenCalledWith({
        data: [
          { tenantId, conversationId: convId, userId: 'u3', role: ConversationMemberRole.MEMBER },
          { tenantId, conversationId: convId, userId: 'u4', role: ConversationMemberRole.MEMBER },
        ],
      });
    });

    it('should throw forbidden if actor is not admin', async () => {
      mockPrisma.conversation.findFirst.mockResolvedValue({ id: 'c1', type: 'GROUP' });
      mockPrisma.conversationMember.findFirst.mockResolvedValue({ role: ConversationMemberRole.MEMBER });

      await expect(
        service.addMembers('t1', 'u1', 'c1', { userIds: ['u2'] }),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('removeMember', () => {
    it('should allow removing self (leave)', async () => {
        const tenantId = 't1';
        const actorId = 'u1';
        const convId = 'c1';

        mockPrisma.conversation.findFirst.mockResolvedValue({ id: convId, type: 'GROUP' });
        mockPrisma.conversationMember.findFirst
            .mockResolvedValueOnce({ userId: actorId, role: ConversationMemberRole.MEMBER }) // actor membership
            .mockResolvedValueOnce({ userId: actorId, role: ConversationMemberRole.MEMBER }); // target membership (same)

        await service.removeMember(tenantId, actorId, convId, actorId);

        expect(mockPrisma.conversationMember.delete).toHaveBeenCalled();
    });

    it('should allow admin to remove other', async () => {
        const tenantId = 't1';
        const actorId = 'admin1';
        const targetId = 'u2';
        const convId = 'c1';

        mockPrisma.conversation.findFirst.mockResolvedValue({ id: convId, type: 'GROUP' });
        mockPrisma.conversationMember.findFirst
            .mockResolvedValueOnce({ userId: actorId, role: ConversationMemberRole.ADMIN }) // actor
            .mockResolvedValueOnce({ userId: targetId, role: ConversationMemberRole.MEMBER }); // target

        await service.removeMember(tenantId, actorId, convId, targetId);

        expect(mockPrisma.conversationMember.delete).toHaveBeenCalled();
    });

    it('should forbid member to remove other', async () => {
        const tenantId = 't1';
        const actorId = 'u1';
        const targetId = 'u2';
        const convId = 'c1';

        mockPrisma.conversation.findFirst.mockResolvedValue({ id: convId, type: 'GROUP' });
        mockPrisma.conversationMember.findFirst
            .mockResolvedValueOnce({ userId: actorId, role: ConversationMemberRole.MEMBER }); // actor

        await expect(
            service.removeMember(tenantId, actorId, convId, targetId),
        ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('listMessages', () => {
    it('should list messages with default pagination', async () => {
        mockPrisma.conversationMember.findFirst.mockResolvedValue({});
        mockPrisma.message.findMany.mockResolvedValue([]);

        await service.listMessages('t1', 'u1', 'c1');

        expect(mockPrisma.message.findMany).toHaveBeenCalledWith(expect.objectContaining({
            take: 50,
            skip: 0,
            cursor: undefined
        }));
    });

    it('should list messages with cursor pagination', async () => {
        mockPrisma.conversationMember.findFirst.mockResolvedValue({});
        mockPrisma.message.findMany.mockResolvedValue([]);

        await service.listMessages('t1', 'u1', 'c1', { cursor: 'msg1', limit: 10 });

        expect(mockPrisma.message.findMany).toHaveBeenCalledWith(expect.objectContaining({
            take: 10,
            skip: 1,
            cursor: { id: 'msg1' }
        }));
    });
  });
});
