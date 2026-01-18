import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDirectConversationDto } from '../dto/create-direct-conversation.dto';
import { CreateGroupConversationDto } from '../dto/create-group-conversation.dto';
import { CreateMessageDto } from '../dto/create-message.dto';
import { AddMembersDto } from '../dto/add-members.dto';
import { GetMessagesDto } from '../dto/get-messages.dto';
import { OutboxService } from './outbox.service';
import { ConversationMemberRole } from '@prisma/client';

@Injectable()
export class ConversationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly outbox: OutboxService,
  ) {}

  async createDirectConversation(tenantId: string, actorId: string, dto: CreateDirectConversationDto) {
    if (actorId === dto.recipientId) {
        throw new BadRequestException('Cannot start a conversation with yourself');
    }

    await this.validateUsersExistInTenant(tenantId, [dto.recipientId]);

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
          { tenantId, conversationId: conversation.id, userId: actorId, role: ConversationMemberRole.ADMIN },
          { tenantId, conversationId: conversation.id, userId: dto.recipientId, role: ConversationMemberRole.ADMIN },
        ],
      });

      return conversation;
    });
  }

  async createGroupConversation(tenantId: string, actorId: string, dto: CreateGroupConversationDto) {
    const uniqueRecipients = [...new Set(dto.recipientIds)].filter((id) => id !== actorId);
    if (uniqueRecipients.length + 1 < 3) {
      throw new BadRequestException('Group must have at least 3 members (including creator)');
    }

    await this.validateUsersExistInTenant(tenantId, uniqueRecipients);

    return this.prisma.$transaction(async (tx) => {
      const conversation = await tx.conversation.create({
        data: {
          tenantId,
          type: 'GROUP',
          name: dto.name,
        },
      });

      // Creator is ADMIN
      await tx.conversationMember.create({
        data: {
          tenantId,
          conversationId: conversation.id,
          userId: actorId,
          role: ConversationMemberRole.ADMIN,
        },
      });

      // Recipients are MEMBER
      await tx.conversationMember.createMany({
        data: uniqueRecipients.map((userId) => ({
          tenantId,
          conversationId: conversation.id,
          userId,
          role: ConversationMemberRole.MEMBER,
        })),
      });

      return conversation;
    });
  }

  async updateGroup(tenantId: string, actorId: string, conversationId: string, dto: UpdateGroupDto) {
    const conversation = await this.ensureConversationExists(tenantId, conversationId);

    if (conversation.type !== 'GROUP') {
      throw new BadRequestException('Cannot update a direct conversation');
    }

    const membership = await this.prisma.conversationMember.findFirst({
      where: { tenantId, conversationId, userId: actorId },
    });

    if (!membership || membership.role !== ConversationMemberRole.ADMIN) {
      throw new ForbiddenException('Only admins can update group details');
    }

    return this.prisma.conversation.update({
      where: { id: conversationId },
      data: {
        name: dto.name,
        avatarFileId: dto.avatarFileId,
      },
    });
  }

  async addMembers(tenantId: string, actorId: string, conversationId: string, dto: AddMembersDto) {
    const conversation = await this.ensureConversationExists(tenantId, conversationId);

    if (conversation.type !== 'GROUP') {
      throw new BadRequestException('Cannot add members to a direct conversation');
    }

    const membership = await this.prisma.conversationMember.findFirst({
      where: { tenantId, conversationId, userId: actorId },
    });

    if (!membership || membership.role !== ConversationMemberRole.ADMIN) {
      throw new ForbiddenException('Only admins can add members');
    }

    const existingMembers = await this.prisma.conversationMember.findMany({
      where: {
        tenantId,
        conversationId,
        userId: { in: dto.userIds },
      },
      select: { userId: true },
    });

    const existingMemberIds = new Set(existingMembers.map(m => m.userId));
    const newMembers = dto.userIds.filter(id => !existingMemberIds.has(id));

    if (newMembers.length === 0) {
        return; // All already added
    }

    await this.validateUsersExistInTenant(tenantId, newMembers);

    await this.prisma.conversationMember.createMany({
      data: newMembers.map((userId) => ({
        tenantId,
        conversationId,
        userId,
        role: ConversationMemberRole.MEMBER,
      })),
    });
  }

  async removeMember(tenantId: string, actorId: string, conversationId: string, userIdToRemove: string) {
    const conversation = await this.ensureConversationExists(tenantId, conversationId);

    if (conversation.type !== 'GROUP') {
      throw new BadRequestException('Cannot remove members from a direct conversation');
    }

    const actorMembership = await this.prisma.conversationMember.findFirst({
      where: { tenantId, conversationId, userId: actorId },
    });

    if (!actorMembership) {
      throw new ForbiddenException('Not a conversation member');
    }

    // If removing someone else, must be ADMIN
    if (actorId !== userIdToRemove && actorMembership.role !== ConversationMemberRole.ADMIN) {
      throw new ForbiddenException('Only admins can remove other members');
    }

    // Check if user to remove exists in conversation
    const targetMembership = await this.prisma.conversationMember.findFirst({
      where: { tenantId, conversationId, userId: userIdToRemove },
    });

    if (!targetMembership) {
      throw new NotFoundException('User is not a member of this conversation');
    }

    await this.prisma.conversationMember.delete({
      where: {
        tenantId_conversationId_userId: {
          tenantId,
          conversationId,
          userId: userIdToRemove,
        },
      },
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
      include: {
        _count: {
          select: { ConversationMember: true } // Helper to see member count
        }
      }
    });
  }

  async listMessages(tenantId: string, actorId: string, conversationId: string, query?: GetMessagesDto) {
    const membership = await this.prisma.conversationMember.findFirst({
      where: { tenantId, conversationId, userId: actorId },
    });

    if (!membership) {
      throw new ForbiddenException('Not a conversation member');
    }

    const limit = query?.limit || 50;
    const cursor = query?.cursor;

    return this.prisma.message.findMany({
      where: { tenantId, conversationId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
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

  private async validateUsersExistInTenant(tenantId: string, userIds: string[]) {
    const uniqueIds = [...new Set(userIds)];
    const profiles = await this.prisma.profilePublic.findMany({
      where: {
        tenantId,
        userId: { in: uniqueIds },
      },
      select: { userId: true },
    });

    if (profiles.length !== uniqueIds.length) {
      const foundIds = new Set(profiles.map((p) => p.userId));
      const missingIds = uniqueIds.filter((id) => !foundIds.has(id));
      throw new BadRequestException(`Users not found in tenant: ${missingIds.join(', ')}`);
    }
  }
}
