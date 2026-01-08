import { Controller, Get, Post, Body, Param, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OutboxService } from '../outbox/outbox.service';
import { TenantId } from '../common/decorators/tenant.decorator';
import { User } from '../common/decorators/user.decorator';
import { FriendshipStatus } from '@prisma/client';

@Controller('v1/friends')
export class FriendsController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly outbox: OutboxService
  ) {}

  @Get()
  async getFriends(@User() user: any, @TenantId() tenantId: string) {
    return this.prisma.friendship.findMany({
      where: {
        tenantId,
        OR: [{ requesterId: user.sub }, { addresseeId: user.sub }],
        status: FriendshipStatus.ACCEPTED
      },
    });
  }

  @Post('requests')
  async sendRequest(@User() user: any, @Body('targetUserId') targetUserId: string, @TenantId() tenantId: string) {
    if (user.sub === targetUserId) throw new BadRequestException("Cannot friend self");

    const exists = await this.prisma.friendship.findFirst({
        where: {
            tenantId,
            OR: [
                { requesterId: user.sub, addresseeId: targetUserId },
                { requesterId: targetUserId, addresseeId: user.sub }
            ]
        }
    });
    if (exists) throw new BadRequestException("Friendship or request already exists");

    const friendship = await this.prisma.friendship.create({
      data: {
        tenantId,
        requesterId: user.sub,
        addresseeId: targetUserId,
        status: FriendshipStatus.PENDING,
      },
    });

    await this.outbox.emit(tenantId, 'social.friend_request.sent', friendship);
    return friendship;
  }

  @Post('requests/:id/accept')
  async acceptRequest(@Param('id') id: string, @User() user: any, @TenantId() tenantId: string) {
    const request = await this.prisma.friendship.findUnique({ where: { id } });
    if (!request || request.tenantId !== tenantId) throw new NotFoundException();
    if (request.addresseeId !== user.sub) throw new BadRequestException("Not your request");

    const updated = await this.prisma.friendship.update({
      where: { id },
      data: { status: FriendshipStatus.ACCEPTED },
    });

    await this.outbox.emit(tenantId, 'social.friend_request.accepted', updated);
    return updated;
  }

  @Post('requests/:id/reject')
  async rejectRequest(@Param('id') id: string, @User() user: any, @TenantId() tenantId: string) {
    const request = await this.prisma.friendship.findUnique({ where: { id } });
    if (!request || request.tenantId !== tenantId) throw new NotFoundException();
    // Allow requester to cancel or addressee to reject
    if (request.addresseeId !== user.sub && request.requesterId !== user.sub) throw new BadRequestException("Not your request");

    return this.prisma.friendship.delete({ where: { id } });
  }
}
