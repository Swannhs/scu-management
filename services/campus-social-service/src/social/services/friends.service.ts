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

  private async ensureNotBlocked(tenantId: string, a: string, b: string) {
    const blocked = await (this.prisma as any).block.findFirst({ where: { tenantId, OR: [{ blockerUserId: a, blockedUserId: b }, { blockerUserId: b, blockedUserId: a }] } });
    if (blocked) throw new ForbiddenException('User is blocked');
  }

  async requestFriend(tenantId: string, requesterId: string, dto: FriendRequestDto) {
    if (requesterId === dto.targetUserId) throw new BadRequestException('Cannot friend yourself');
    await this.ensureNotBlocked(tenantId, requesterId, dto.targetUserId);

    const friendship = await this.prisma.friendship.upsert({
      where: { tenantId_requesterId_addresseeId: { tenantId, requesterId, addresseeId: dto.targetUserId } },
      update: { status: 'PENDING' },
      create: { tenantId, requesterId, addresseeId: dto.targetUserId, status: 'PENDING' },
    });

    await this.outbox.publishEvent(tenantId, 'social.friend_request.sent', { friendshipId: friendship.id, requesterId, addresseeId: dto.targetUserId });
    return friendship;
  }

  async acceptRequest(tenantId: string, actorId: string, requestId: string) {
    const friendship = await this.prisma.friendship.findFirst({ where: { tenantId, id: requestId } });
    if (!friendship) throw new NotFoundException('Friend request not found');
    if (friendship.addresseeId !== actorId) throw new ForbiddenException('Not allowed to accept this request');
    const updated = await this.prisma.friendship.update({ where: { id: friendship.id }, data: { status: 'ACCEPTED' } });
    await this.outbox.publishEvent(tenantId, 'social.friend_request.accepted', { friendshipId: updated.id, requesterId: updated.requesterId, addresseeId: updated.addresseeId });
    return updated;
  }

  async rejectRequest(tenantId: string, actorId: string, requestId: string) {
    const friendship = await this.prisma.friendship.findFirst({ where: { tenantId, id: requestId } });
    if (!friendship) throw new NotFoundException('Friend request not found');
    if (friendship.addresseeId !== actorId) throw new ForbiddenException('Not allowed to reject this request');
    await this.prisma.friendship.delete({ where: { id: friendship.id } });
    return { status: 'rejected' };
  }

  async listFriends(tenantId: string, actorId: string) {
    return this.prisma.friendship.findMany({ where: { tenantId, status: 'ACCEPTED', OR: [{ requesterId: actorId }, { addresseeId: actorId }] } });
  }

  async listRequests(tenantId: string, actorId: string, status: string = 'all') {
    const where: any = { tenantId };
    if (status === 'pending') {
      where.addresseeId = actorId;
      where.status = 'PENDING';
    } else if (status === 'sent') {
      where.requesterId = actorId;
      where.status = 'PENDING';
    } else {
      where.OR = [{ requesterId: actorId }, { addresseeId: actorId }];
    }
    return this.prisma.friendship.findMany({ where, orderBy: { createdAt: 'desc' } });
  }

  async cancelRequest(tenantId: string, actorId: string, requestId: string) {
    const friendship = await this.prisma.friendship.findFirst({ where: { tenantId, id: requestId } });
    if (!friendship) throw new NotFoundException('Friend request not found');
    if (friendship.requesterId !== actorId) throw new ForbiddenException('Not allowed to cancel this request');
    await this.prisma.friendship.delete({ where: { id: requestId } });
    return { status: 'cancelled' };
  }

  async blockUser(tenantId: string, actorId: string, userId: string) {
    await (this.prisma as any).block.upsert({
      where: { tenantId_blockerUserId_blockedUserId: { tenantId, blockerUserId: actorId, blockedUserId: userId } },
      update: {},
      create: { tenantId, blockerUserId: actorId, blockedUserId: userId },
    });
    await this.prisma.friendship.deleteMany({ where: { tenantId, OR: [{ requesterId: actorId, addresseeId: userId }, { requesterId: userId, addresseeId: actorId }] } });
    return { status: 'blocked' };
  }

  async unblockUser(tenantId: string, actorId: string, userId: string) {
    await (this.prisma as any).block.deleteMany({ where: { tenantId, blockerUserId: actorId, blockedUserId: userId } });
    return { status: 'unblocked' };
  }

  async listBlocked(tenantId: string, actorId: string) {
    return (this.prisma as any).block.findMany({ where: { tenantId, blockerUserId: actorId }, orderBy: { createdAt: 'desc' } });
  }

  async mutualFriends(tenantId: string, actorId: string, userId: string) {
    const my = await this.listFriends(tenantId, actorId);
    const their = await this.listFriends(tenantId, userId);
    const mySet = new Set(my.map((f) => (f.requesterId === actorId ? f.addresseeId : f.requesterId)));
    return their.filter((f) => mySet.has(f.requesterId === userId ? f.addresseeId : f.requesterId));
  }
}
