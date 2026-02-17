import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { Roles } from 'nest-keycloak-connect';
import { Request } from 'express';
import { TenantContextParam } from '../../common/tenant-context.decorator';
import type { TenantContext } from '../../common/tenant-context';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CreatePostDto } from '../dto/create-post.dto';
import { CreateReactionDto } from '../dto/create-reaction.dto';
import { PaginationDto } from '../dto/pagination.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { CreateReportDto } from '../dto/create-report.dto';
import { CloseReportDto } from '../dto/close-report.dto';
import { PostsService } from '../services/posts.service';

@Controller('v1')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('posts')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async createPost(@TenantContextParam() tenantContext: TenantContext, @Req() req: Request, @Body() dto: CreatePostDto) {
    return this.postsService.createPost(tenantContext.effectiveTenantId, req.user?.sub as string, dto);
  }

  @Get('feed')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async getFeed(@TenantContextParam() tenantContext: TenantContext, @Req() req: Request, @Query() query: PaginationDto) {
    return this.postsService.getFeed(tenantContext.effectiveTenantId, req.user?.sub as string, query);
  }

  @Get('posts')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async getPosts(@TenantContextParam() tenantContext: TenantContext, @Req() req: Request, @Query() query: PaginationDto) {
    return this.postsService.getFeed(tenantContext.effectiveTenantId, req.user?.sub as string, query);
  }

  @Get('posts/:id')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async getPost(@TenantContextParam() tenantContext: TenantContext, @Param('id') postId: string) {
    return this.postsService.getPost(tenantContext.effectiveTenantId, postId);
  }

  @Patch('posts/:id')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async updatePost(@TenantContextParam() tenantContext: TenantContext, @Req() req: Request, @Param('id') postId: string, @Body() dto: UpdatePostDto) {
    const roles = req.user?.realm_access?.roles ?? [];
    return this.postsService.updatePost(tenantContext.effectiveTenantId, req.user?.sub as string, postId, dto, roles);
  }

  @Delete('posts/:id')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async deletePost(@TenantContextParam() tenantContext: TenantContext, @Req() req: Request, @Param('id') postId: string) {
    const roles = req.user?.realm_access?.roles ?? [];
    return this.postsService.deletePost(tenantContext.effectiveTenantId, req.user?.sub as string, postId, roles);
  }

  @Post('posts/:id/comments')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async addComment(@TenantContextParam() tenantContext: TenantContext, @Req() req: Request, @Param('id') postId: string, @Body() dto: CreateCommentDto) {
    return this.postsService.addComment(tenantContext.effectiveTenantId, postId, req.user?.sub as string, dto);
  }

  @Get('posts/:id/comments')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async listComments(@TenantContextParam() tenantContext: TenantContext, @Param('id') postId: string, @Query() query: PaginationDto) {
    return this.postsService.listComments(tenantContext.effectiveTenantId, postId, query);
  }

  @Patch('comments/:id')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async updateComment(@TenantContextParam() tenantContext: TenantContext, @Req() req: Request, @Param('id') commentId: string, @Body() dto: UpdateCommentDto) {
    return this.postsService.updateComment(tenantContext.effectiveTenantId, req.user?.sub as string, commentId, dto);
  }

  @Delete('comments/:id')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async deleteComment(@TenantContextParam() tenantContext: TenantContext, @Req() req: Request, @Param('id') commentId: string) {
    const roles = req.user?.realm_access?.roles ?? [];
    return this.postsService.deleteComment(tenantContext.effectiveTenantId, req.user?.sub as string, commentId, roles);
  }

  @Post('posts/:id/react')
  @Post('posts/:id/reactions')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async reactToPost(@TenantContextParam() tenantContext: TenantContext, @Req() req: Request, @Param('id') postId: string, @Body() dto: CreateReactionDto) {
    return this.postsService.reactToPost(tenantContext.effectiveTenantId, postId, req.user?.sub as string, dto);
  }

  @Post('reports')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async createReport(@TenantContextParam() tenantContext: TenantContext, @Req() req: Request, @Body() dto: CreateReportDto) {
    return this.postsService.createReport(tenantContext.effectiveTenantId, req.user?.sub as string, dto);
  }

  @Get('moderation/reports')
  @Roles({ roles: ['TENANT_ADMIN', 'MODERATOR'] })
  async listReports(@TenantContextParam() tenantContext: TenantContext, @Query('status') status?: string) {
    return this.postsService.listReports(tenantContext.effectiveTenantId, status);
  }

  @Post('moderation/reports/:id/close')
  @Roles({ roles: ['TENANT_ADMIN', 'MODERATOR'] })
  async closeReport(@TenantContextParam() tenantContext: TenantContext, @Param('id') reportId: string, @Body() dto: CloseReportDto) {
    return this.postsService.closeReport(tenantContext.effectiveTenantId, reportId, dto.actionTaken);
  }
}
