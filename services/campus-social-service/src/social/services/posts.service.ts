import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CreatePostDto } from '../dto/create-post.dto';
import { CreateReactionDto } from '../dto/create-reaction.dto';
import { PaginationDto } from '../dto/pagination.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { CreateReportDto } from '../dto/create-report.dto';
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

  async getFeed(tenantId: string, actorId: string, query?: PaginationDto) {
    const memberships = await this.prisma.groupMember.findMany({
      where: { tenantId, userId: actorId, status: 'ACTIVE' },
      select: { groupId: true },
    });
    const groupIds = memberships.map((membership) => membership.groupId);
    const limit = query?.limit ?? 20;
    const cursor = query?.cursor;

    const items = await this.prisma.post.findMany({
      where: {
        tenantId,
        OR: [{ targetType: 'PROFILE', targetId: actorId }, { targetType: 'GROUP', targetId: { in: groupIds } }],
      },
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      take: limit + 1,
      ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
    });

    const hasNext = items.length > limit;
    const sliced = hasNext ? items.slice(0, limit) : items;
    return { items: sliced.map((p) => (p.deletedAt ? { ...p, text: '[deleted]' } : p)), nextCursor: hasNext ? sliced[sliced.length - 1].id : null };
  }

  async getPost(tenantId: string, postId: string) {
    const post = await this.prisma.post.findFirst({ where: { tenantId, id: postId } });
    if (!post) throw new NotFoundException('Post not found');
    return post.deletedAt ? { ...post, text: '[deleted]' } : post;
  }

  async listComments(tenantId: string, postId: string, query?: PaginationDto) {
    const limit = query?.limit ?? 20;
    const cursor = query?.cursor;
    const items = await this.prisma.comment.findMany({
      where: { tenantId, postId },
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      take: limit + 1,
      ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
    });
    const hasNext = items.length > limit;
    const sliced = hasNext ? items.slice(0, limit) : items;
    return { items: sliced.map((c) => (c.deletedAt ? { ...c, text: '[deleted]' } : c)), nextCursor: hasNext ? sliced[sliced.length - 1].id : null };
  }

  async addComment(tenantId: string, postId: string, authorId: string, dto: CreateCommentDto) {
    const comment = await this.prisma.comment.create({
      data: { tenantId, postId, authorId, parentCommentId: dto.parentCommentId, text: dto.text },
    });
    await this.outbox.publishEvent(tenantId, 'social.comment.created', { commentId: comment.id, postId, authorId });
    return comment;
  }

  async reactToPost(tenantId: string, postId: string, actorId: string, dto: CreateReactionDto) {
    return this.prisma.reaction.upsert({
      where: { tenantId_targetType_targetId_userId: { tenantId, targetType: 'POST', targetId: postId, userId: actorId } },
      update: { reactionType: dto.reactionType },
      create: { tenantId, targetType: 'POST', targetId: postId, userId: actorId, reactionType: dto.reactionType },
    });
  }

  async updatePost(tenantId: string, actorId: string, postId: string, dto: UpdatePostDto, roles: string[]) {
    const post = await this.prisma.post.findFirst({ where: { tenantId, id: postId } });
    if (!post) throw new NotFoundException('Post not found');
    if (post.authorId !== actorId && !roles.includes('TENANT_ADMIN')) throw new ForbiddenException('Not allowed');
    return this.prisma.post.update({ where: { id: postId }, data: { text: dto.text } });
  }

  async deletePost(tenantId: string, actorId: string, postId: string, roles: string[]) {
    const post = await this.prisma.post.findFirst({ where: { tenantId, id: postId } });
    if (!post) throw new NotFoundException('Post not found');
    if (post.authorId !== actorId && !roles.includes('TENANT_ADMIN')) throw new ForbiddenException('Not allowed');
    return this.prisma.post.update({ where: { id: postId }, data: { deletedAt: new Date(), text: '[deleted]' } });
  }

  async updateComment(tenantId: string, actorId: string, commentId: string, dto: UpdateCommentDto) {
    const comment = await this.prisma.comment.findFirst({ where: { tenantId, id: commentId } });
    if (!comment) throw new NotFoundException('Comment not found');
    if (comment.authorId !== actorId) throw new ForbiddenException('Not allowed');
    return this.prisma.comment.update({ where: { id: commentId }, data: { text: dto.text } });
  }

  async deleteComment(tenantId: string, actorId: string, commentId: string, roles: string[]) {
    const comment = await this.prisma.comment.findFirst({ where: { tenantId, id: commentId } });
    if (!comment) throw new NotFoundException('Comment not found');
    if (comment.authorId !== actorId && !roles.includes('TENANT_ADMIN')) throw new ForbiddenException('Not allowed');
    return this.prisma.comment.update({ where: { id: commentId }, data: { deletedAt: new Date(), text: '[deleted]' } });
  }

  async createReport(tenantId: string, reporterId: string, dto: CreateReportDto) {
    return (this.prisma as any).report.create({ data: { tenantId, reporterId, type: dto.type, targetId: dto.targetId, reason: dto.reason, details: dto.details } });
  }

  async listReports(tenantId: string, status?: string) {
    return (this.prisma as any).report.findMany({ where: { tenantId, ...(status ? { status } : {}) }, orderBy: { createdAt: 'desc' } });
  }

  async closeReport(tenantId: string, reportId: string, actionTaken: string) {
    return (this.prisma as any).report.update({ where: { id: reportId }, data: { status: 'closed', actionTaken, closedAt: new Date() } });
  }
}
