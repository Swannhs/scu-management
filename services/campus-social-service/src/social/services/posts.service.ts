import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CreatePostDto } from '../dto/create-post.dto';
import { CreateReactionDto } from '../dto/create-reaction.dto';
import { OutboxService } from './outbox.service';

@Injectable()
export class PostsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly outbox: OutboxService,
  ) {}

  async createPost(tenantId: string, authorId: string, dto: CreatePostDto) {
    const post = await this.prisma.post.create({
      data: {
        tenantId,
        authorId,
        targetType: dto.targetType,
        targetId: dto.targetId,
        text: dto.text,
      },
    });

    if (dto.mediaFileIds?.length) {
      await this.prisma.postMedia.createMany({
        data: dto.mediaFileIds.map((fileId) => ({
          tenantId,
          postId: post.id,
          fileId,
        })),
      });
    }

    await this.outbox.publishEvent(tenantId, 'social.post.created', {
      postId: post.id,
      authorId,
      targetType: post.targetType,
      targetId: post.targetId,
    });

    return post;
  }

  async getFeed(tenantId: string, actorId: string) {
    const memberships = await this.prisma.groupMember.findMany({
      where: { tenantId, userId: actorId },
      select: { groupId: true },
    });

    const groupIds = memberships.map((membership) => membership.groupId);

    return this.prisma.post.findMany({
      where: {
        tenantId,
        OR: [
          { targetType: 'PROFILE', targetId: actorId },
          { targetType: 'GROUP', targetId: { in: groupIds } },
        ],
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async addComment(tenantId: string, postId: string, authorId: string, dto: CreateCommentDto) {
    const comment = await this.prisma.comment.create({
      data: {
        tenantId,
        postId,
        authorId,
        parentCommentId: dto.parentCommentId,
        text: dto.text,
      },
    });

    await this.outbox.publishEvent(tenantId, 'social.comment.created', {
      commentId: comment.id,
      postId,
      authorId,
    });

    return comment;
  }

  async reactToPost(tenantId: string, postId: string, actorId: string, dto: CreateReactionDto) {
    return this.prisma.reaction.upsert({
      where: {
        tenantId_targetType_targetId_userId: {
          tenantId,
          targetType: 'POST',
          targetId: postId,
          userId: actorId,
        },
      },
      update: {
        reactionType: dto.reactionType,
      },
      create: {
        tenantId,
        targetType: 'POST',
        targetId: postId,
        userId: actorId,
        reactionType: dto.reactionType,
      },
    });
  }
}
