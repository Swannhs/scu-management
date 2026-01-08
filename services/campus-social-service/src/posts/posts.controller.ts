import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OutboxService } from '../outbox/outbox.service';
import { TenantId } from '../common/decorators/tenant.decorator';
import { User } from '../common/decorators/user.decorator';
import { TargetType, ReactionTarget, ReactionType } from '@prisma/client';

@Controller('v1/posts')
export class PostsController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly outbox: OutboxService
  ) {}

  @Post()
  async createPost(@User() user: any, @Body() data: any, @TenantId() tenantId: string) {
    const post = await this.prisma.post.create({
      data: {
        tenantId,
        authorId: user.sub,
        targetType: data.targetType || TargetType.PROFILE,
        targetId: data.targetId || user.sub,
        text: data.text,
      },
    });

    await this.outbox.emit(tenantId, 'social.post.created', post);
    return post;
  }

  @Get('feed')
  async getFeed(@User() user: any, @TenantId() tenantId: string) {
    // Simplified feed: posts from friends + groups I'm in + my posts
    // 1. Get friend IDs
    const friends = await this.prisma.friendship.findMany({
        where: {
            tenantId,
            status: 'ACCEPTED',
            OR: [{ requesterId: user.sub }, { addresseeId: user.sub }]
        }
    });
    const friendIds = friends.map(f => f.requesterId === user.sub ? f.addresseeId : f.requesterId);

    // 2. Get group IDs
    const memberships = await this.prisma.groupMember.findMany({
        where: { tenantId, userId: user.sub }
    });
    const groupIds = memberships.map(m => m.groupId);

    // 3. Query
    return this.prisma.post.findMany({
        where: {
            tenantId,
            OR: [
                { authorId: user.sub },
                { authorId: { in: friendIds }, targetType: TargetType.PROFILE }, // Friends' profile posts
                { targetType: TargetType.GROUP, targetId: { in: groupIds } } // Group posts
            ]
        },
        orderBy: { createdAt: 'desc' },
        include: { media: true, reactions: true, comments: { take: 3 } }
    });
  }

  @Post(':id/comments')
  async addComment(@Param('id') id: string, @User() user: any, @Body() data: any, @TenantId() tenantId: string) {
    const comment = await this.prisma.comment.create({
        data: {
            tenantId,
            postId: id,
            authorId: user.sub,
            text: data.text,
            parentCommentId: data.parentCommentId
        }
    });
    await this.outbox.emit(tenantId, 'social.comment.created', comment);
    return comment;
  }

  @Post(':id/react')
  async react(@Param('id') id: string, @User() user: any, @Body() data: any, @TenantId() tenantId: string) {
    return this.prisma.reaction.upsert({
        where: {
            tenantId_targetType_targetId_userId: {
                tenantId,
                targetType: ReactionTarget.POST,
                targetId: id,
                userId: user.sub
            }
        },
        update: { reactionType: data.type },
        create: {
            tenantId,
            targetType: ReactionTarget.POST,
            targetId: id,
            userId: user.sub,
            reactionType: data.type || ReactionType.LIKE
        }
    });
  }
}
