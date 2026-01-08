import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
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
  async getFeed(@TenantContextParam() tenantContext: TenantContext, @Req() req: Request) {
    const userId = req.user?.sub as string;
    return this.postsService.getFeed(tenantContext.effectiveTenantId, userId);
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

  @Post('posts/:id/react')
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
