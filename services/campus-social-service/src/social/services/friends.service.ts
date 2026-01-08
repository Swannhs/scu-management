import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { FriendRequestDto } from '../dto/friend-request.dto';
import { OutboxService } from './outbox.service';

@Injectable()
export class FriendsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly outbox: OutboxService,
  ) {}

  async requestFriend(tenantId: string, requesterId: string, dto: FriendRequestDto) {
    if (requesterId === dto.addresseeId) {
      throw new BadRequestException('Cannot friend yourself');
    }

    const existing = await this.prisma.friendship.findUnique({
      where: {
        tenantId_requesterId_addresseeId: {
          tenantId,
          requesterId,
          addresseeId: dto.addresseeId,
        },
      },
    });

    if (existing?.status === 'BLOCKED') {
      throw new ForbiddenException('Friendship blocked');
    }

    const friendship = await this.prisma.friendship.upsert({
      where: {
        tenantId_requesterId_addresseeId: {
          tenantId,
          requesterId,
          addresseeId: dto.addresseeId,
        },
      },
      update: {
        status: 'PENDING',
      },
      create: {
        tenantId,
        requesterId,
        addresseeId: dto.addresseeId,
        status: 'PENDING',
      },
    });

    await this.outbox.publishEvent(tenantId, 'social.friend_request.sent', {
      friendshipId: friendship.id,
      requesterId,
      addresseeId: dto.addresseeId,
    });

    return friendship;
  }

  async acceptRequest(tenantId: string, actorId: string, requestId: string) {
    const friendship = await this.prisma.friendship.findFirst({
      where: {
        tenantId,
        id: requestId,
      },
    });

    if (!friendship) {
      throw new NotFoundException('Friend request not found');
    }

    if (friendship.addresseeId !== actorId) {
      throw new ForbiddenException('Not allowed to accept this request');
    }

    const updated = await this.prisma.friendship.update({
      where: { id: friendship.id },
      data: { status: 'ACCEPTED' },
    });

    await this.outbox.publishEvent(tenantId, 'social.friend_request.accepted', {
      friendshipId: updated.id,
      requesterId: updated.requesterId,
      addresseeId: updated.addresseeId,
    });

    return updated;
  }

  async rejectRequest(tenantId: string, actorId: string, requestId: string) {
    const friendship = await this.prisma.friendship.findFirst({
      where: {
        tenantId,
        id: requestId,
      },
    });

    if (!friendship) {
      throw new NotFoundException('Friend request not found');
    }

    if (friendship.addresseeId !== actorId) {
      throw new ForbiddenException('Not allowed to reject this request');
    }

    await this.prisma.friendship.delete({
      where: { id: friendship.id },
    });

    return { status: 'rejected' };
  }

  async listFriends(tenantId: string, actorId: string) {
    return this.prisma.friendship.findMany({
      where: {
        tenantId,
        status: 'ACCEPTED',
        OR: [{ requesterId: actorId }, { addresseeId: actorId }],
      },
    });
  }
}
