import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDirectConversationDto } from '../dto/create-direct-conversation.dto';
import { CreateMessageDto } from '../dto/create-message.dto';
import { OutboxService } from './outbox.service';

@Injectable()
export class ConversationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly outbox: OutboxService,
  ) {}

  async createDirectConversation(tenantId: string, actorId: string, dto: CreateDirectConversationDto) {
    const actorMemberships = await this.prisma.conversationMember.findMany({
      where: { tenantId, userId: actorId },
      select: { conversationId: true },
    });

    const recipientMemberships = await this.prisma.conversationMember.findMany({
      where: { tenantId, userId: dto.recipientId },
      select: { conversationId: true },
    });

    const actorConversationIds = new Set(actorMemberships.map((membership) => membership.conversationId));
    const sharedConversationId = recipientMemberships
      .map((membership) => membership.conversationId)
      .find((id) => actorConversationIds.has(id));

    if (sharedConversationId) {
      const existing = await this.prisma.conversation.findFirst({
        where: { tenantId, id: sharedConversationId, type: 'DIRECT' },
      });
      if (existing) {
        return existing;
      }
    }

    return this.prisma.$transaction(async (tx) => {
      const conversation = await tx.conversation.create({
        data: {
          tenantId,
          type: 'DIRECT',
        },
      });

      await tx.conversationMember.createMany({
        data: [
          { tenantId, conversationId: conversation.id, userId: actorId },
          { tenantId, conversationId: conversation.id, userId: dto.recipientId },
        ],
      });

      return conversation;
    });
  }

  async listConversations(tenantId: string, actorId: string) {
    const memberships = await this.prisma.conversationMember.findMany({
      where: { tenantId, userId: actorId },
      select: { conversationId: true },
    });

    return this.prisma.conversation.findMany({
      where: {
        tenantId,
        id: { in: memberships.map((membership) => membership.conversationId) },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async listMessages(tenantId: string, actorId: string, conversationId: string) {
    const membership = await this.prisma.conversationMember.findFirst({
      where: { tenantId, conversationId, userId: actorId },
    });

    if (!membership) {
      throw new ForbiddenException('Not a conversation member');
    }

    return this.prisma.message.findMany({
      where: { tenantId, conversationId },
      orderBy: { createdAt: 'asc' },
    });
  }

  async sendMessage(
    tenantId: string,
    actorId: string,
    conversationId: string,
    dto: CreateMessageDto,
  ) {
    const membership = await this.prisma.conversationMember.findFirst({
      where: { tenantId, conversationId, userId: actorId },
    });

    if (!membership) {
      throw new ForbiddenException('Not a conversation member');
    }

    const message = await this.prisma.message.create({
      data: {
        tenantId,
        conversationId,
        senderId: actorId,
        text: dto.text,
        fileId: dto.fileId,
      },
    });

    await this.outbox.publishEvent(tenantId, 'social.message.sent', {
      messageId: message.id,
      conversationId,
      senderId: actorId,
    });

    return message;
  }

  async ensureConversationExists(tenantId: string, conversationId: string) {
    const conversation = await this.prisma.conversation.findFirst({
      where: { tenantId, id: conversationId },
    });

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    return conversation;
  }
}
