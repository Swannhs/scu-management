import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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
        data: dto.mediaFileIds.map((fileId) => ({ tenantId, postId: post.id, fileId })),
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

  async getFeed(tenantId: string, actorId: string, cursor?: string, limit = 20) {
    const memberships = await this.prisma.groupMember.findMany({
      where: { tenantId, userId: actorId },
      select: { groupId: true },
    });

    const groupIds = memberships.map((membership) => membership.groupId);

    return this.prisma.post.findMany({
      where: {
        tenantId,
        OR: [{ targetType: 'PROFILE', targetId: actorId }, { targetType: 'GROUP', targetId: { in: groupIds } }],
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
    });
  }

  async getPost(tenantId: string, postId: string) {
    const post = await this.prisma.post.findFirst({ where: { tenantId, id: postId } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
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

    await this.outbox.publishEvent(tenantId, 'social.comment.created', { commentId: comment.id, postId, authorId });

    return comment;
  }

  async listComments(tenantId: string, postId: string, cursor?: string, limit = 20) {
    return this.prisma.comment.findMany({
      where: { tenantId, postId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
    });
  }

  async deleteComment(tenantId: string, postId: string, commentId: string, actorId: string, roles: string[]) {
    const comment = await this.prisma.comment.findFirst({ where: { tenantId, postId, id: commentId } });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    const isModerator = roles.includes('TENANT_ADMIN') || roles.includes('admin');
    if (comment.authorId !== actorId && !isModerator) {
      throw new ForbiddenException('Only author or moderator can delete comment');
    }

    await this.prisma.comment.delete({ where: { id: comment.id } });
    return { status: 'deleted' };
  }

  async reportEntity(tenantId: string, actorId: string, entityType: 'POST' | 'COMMENT', entityId: string, reason?: string) {
    await this.outbox.publishEvent(tenantId, 'social.content.reported', {
      entityType,
      entityId,
      actorId,
      reason: reason ?? 'unspecified',
    });

    return { status: 'REPORTED', entityType, entityId };
  }

  async reactToPost(tenantId: string, postId: string, actorId: string, dto: CreateReactionDto) {
    const existing = await this.prisma.reaction.findUnique({
      where: {
        tenantId_targetType_targetId_userId: {
          tenantId,
          targetType: 'POST',
          targetId: postId,
          userId: actorId,
        },
      },
    });

    if (existing?.reactionType === dto.reactionType) {
      await this.prisma.reaction.delete({ where: { id: existing.id } });
      return { status: 'UNLIKED' };
    }

    if (existing) {
      return this.prisma.reaction.update({ where: { id: existing.id }, data: { reactionType: dto.reactionType } });
    }

    return this.prisma.reaction.create({
      data: {
        tenantId,
        targetType: 'POST',
        targetId: postId,
        userId: actorId,
        reactionType: dto.reactionType,
      },
    });
  }
}
