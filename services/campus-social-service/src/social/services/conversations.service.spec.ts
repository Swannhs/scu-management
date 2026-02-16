import { Test, TestingModule } from '@nestjs/testing';
import { ConversationsService } from './conversations.service';
import { PrismaService } from '../../prisma/prisma.service';
import { OutboxService } from './outbox.service';
import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { ConversationMemberRole } from '@prisma/client';

const mockPrismaService = {
  conversation: {
    findFirst: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    findMany: jest.fn(),
  },
  conversationMember: {
    findFirst: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    createMany: jest.fn(),
    delete: jest.fn(),
  },
  profilePublic: {
    findMany: jest.fn(),
  },
  message: {
    create: jest.fn(),
    findMany: jest.fn(),
  },
  conversationRead: {
    upsert: jest.fn(),
  },
  $transaction: jest.fn((cb) => cb(mockPrismaService)),
};

const mockOutboxService = {
  publishEvent: jest.fn(),
};

describe('ConversationsService', () => {
  let service: ConversationsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConversationsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: OutboxService,
          useValue: mockOutboxService,
        },
      ],
    }).compile();

    service = module.get<ConversationsService>(ConversationsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('updateGroup', () => {
    it('should update group details if admin', async () => {
      const tenantId = 'tenant-1';
      const actorId = 'user-1';
      const conversationId = 'conv-1';
      const dto = { name: 'New Name' };

      (prisma.conversation.findFirst as jest.Mock).mockResolvedValue({
        id: conversationId,
        type: 'GROUP',
      });

      (prisma.conversationMember.findFirst as jest.Mock).mockResolvedValue({
        userId: actorId,
        role: ConversationMemberRole.ADMIN,
      });

      (prisma.conversation.update as jest.Mock).mockResolvedValue({
        id: conversationId,
        name: 'New Name',
      });

      const result = await service.updateGroup(tenantId, actorId, conversationId, dto);
      expect(result.name).toBe('New Name');
      expect(prisma.conversation.update).toHaveBeenCalled();
    });

    it('should throw Forbidden if not admin', async () => {
      const tenantId = 'tenant-1';
      const actorId = 'user-2';
      const conversationId = 'conv-1';
      const dto = { name: 'New Name' };

      (prisma.conversation.findFirst as jest.Mock).mockResolvedValue({
        id: conversationId,
        type: 'GROUP',
      });

      (prisma.conversationMember.findFirst as jest.Mock).mockResolvedValue({
        userId: actorId,
        role: ConversationMemberRole.MEMBER,
      });

      await expect(service.updateGroup(tenantId, actorId, conversationId, dto)).rejects.toThrow(ForbiddenException);
    });
  });

  describe('createGroupConversation', () => {
    it('should create group conversation', async () => {
      const tenantId = 'tenant-1';
      const actorId = 'user-1';
      const dto = { name: 'Group Chat', recipientIds: ['user-2', 'user-3'] };

      (prisma.profilePublic.findMany as jest.Mock).mockResolvedValue([
        { userId: 'user-2' }, { userId: 'user-3' }
      ]);

      (prisma.conversation.create as jest.Mock).mockResolvedValue({
         id: 'conv-new',
         type: 'GROUP',
         name: 'Group Chat'
      });

      const result = await service.createGroupConversation(tenantId, actorId, dto);
      expect(result).toBeDefined();
      expect(prisma.conversation.create).toHaveBeenCalled();
      expect(prisma.conversationMember.create).toHaveBeenCalled(); // Admin
      expect(prisma.conversationMember.createMany).toHaveBeenCalled(); // Members
    });
  });

  // Basic sanity check for other methods to ensure coverage isn't "deleted"
  describe('sendMessage', () => {
      it('should send message', async () => {
        const tenantId = 'tenant-1';
        const actorId = 'user-1';
        const conversationId = 'conv-1';
        const dto = { text: 'Hello' };

        (prisma.conversationMember.findFirst as jest.Mock).mockResolvedValue({ userId: actorId });
        (prisma.message.create as jest.Mock).mockResolvedValue({ id: 'msg-1', text: 'Hello' });

        await service.sendMessage(tenantId, actorId, conversationId, dto);
        expect(prisma.message.create).toHaveBeenCalled();
        expect(mockOutboxService.publishEvent).toHaveBeenCalled();
      });
  });
});


  describe('read receipts', () => {
    it('updates read state after send message', async () => {
      (prisma.conversationMember.findFirst as jest.Mock).mockResolvedValue({ userId: 'user-1' });
      (prisma.message.create as jest.Mock).mockResolvedValue({ id: 'msg-1', text: 'Hello' });
      (prisma.conversationRead.upsert as jest.Mock).mockResolvedValue({ conversationId: 'conv-1', userId: 'user-1' });
      await service.sendMessage('tenant-1', 'user-1', 'conv-1', { text: 'Hello' });
      const state = await service.markRead('tenant-1', 'user-1', 'conv-1', { lastReadMessageId: 'msg-1' });
      expect(state.userId).toBe('user-1');
    });
  });
