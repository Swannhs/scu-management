import { Body, Controller, Delete, Get, Param, Post, Query, Req } from '@nestjs/common';
import { Roles } from 'nest-keycloak-connect';
import { Request } from 'express';
import { TenantContextParam } from '../../common/tenant-context.decorator';
import { TenantContext } from '../../common/tenant-context';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CreatePostDto } from '../dto/create-post.dto';
import { CreateReactionDto } from '../dto/create-reaction.dto';
import { PostsService } from '../services/posts.service';

@Controller('v1')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('posts')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async createPost(
    @TenantContextParam() tenantContext: TenantContext,
    @Req() req: Request,
    @Body() dto: CreatePostDto,
  ) {
    const userId = req.user?.sub as string;
    return this.postsService.createPost(tenantContext.effectiveTenantId, userId, dto);
  }

  @Get('feed')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async getFeed(
    @TenantContextParam() tenantContext: TenantContext,
    @Req() req: Request,
    @Query('cursor') cursor?: string,
    @Query('limit') limit?: string,
  ) {
    const userId = req.user?.sub as string;
    return this.postsService.getFeed(tenantContext.effectiveTenantId, userId, cursor, limit ? Number(limit) : 20);
  }

  @Get('posts')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async getPosts(
    @TenantContextParam() tenantContext: TenantContext,
    @Req() req: Request,
    @Query('cursor') cursor?: string,
    @Query('limit') limit?: string,
  ) {
    const userId = req.user?.sub as string;
    return this.postsService.getFeed(tenantContext.effectiveTenantId, userId, cursor, limit ? Number(limit) : 20);
  }

  @Get('posts/:id')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async getPost(@TenantContextParam() tenantContext: TenantContext, @Param('id') postId: string) {
    return this.postsService.getPost(tenantContext.effectiveTenantId, postId);
  }

  @Post('posts/:id/comments')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async addComment(
    @TenantContextParam() tenantContext: TenantContext,
    @Req() req: Request,
    @Param('id') postId: string,
    @Body() dto: CreateCommentDto,
  ) {
    const userId = req.user?.sub as string;
    return this.postsService.addComment(tenantContext.effectiveTenantId, postId, userId, dto);
  }

  @Get('posts/:id/comments')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async listComments(
    @TenantContextParam() tenantContext: TenantContext,
    @Param('id') postId: string,
    @Query('cursor') cursor?: string,
    @Query('limit') limit?: string,
  ) {
    return this.postsService.listComments(tenantContext.effectiveTenantId, postId, cursor, limit ? Number(limit) : 20);
  }

  @Delete('posts/:id/comments/:commentId')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async deleteComment(
    @TenantContextParam() tenantContext: TenantContext,
    @Req() req: Request,
    @Param('id') postId: string,
    @Param('commentId') commentId: string,
  ) {
    const userId = req.user?.sub as string;
    const roles = (req.user?.realm_access?.roles ?? []) as string[];
    return this.postsService.deleteComment(tenantContext.effectiveTenantId, postId, commentId, userId, roles);
  }

  @Post('posts/:id/report')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async reportPost(
    @TenantContextParam() tenantContext: TenantContext,
    @Req() req: Request,
    @Param('id') postId: string,
    @Body() body: { reason?: string },
  ) {
    const userId = req.user?.sub as string;
    return this.postsService.reportEntity(tenantContext.effectiveTenantId, userId, 'POST', postId, body.reason);
  }

  @Post('posts/:id/react')
  @Post('posts/:id/reactions')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async reactToPost(
    @TenantContextParam() tenantContext: TenantContext,
    @Req() req: Request,
    @Param('id') postId: string,
    @Body() dto: CreateReactionDto,
  ) {
    const userId = req.user?.sub as string;
    return this.postsService.reactToPost(tenantContext.effectiveTenantId, postId, userId, dto);
  }
}
