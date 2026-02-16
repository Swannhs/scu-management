import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { Roles } from 'nest-keycloak-connect';
import { Request } from 'express';
import { TenantContextParam } from '../../common/tenant-context.decorator';
import { TenantContext } from '../../common/tenant-context';
import { FriendRequestDto } from '../dto/friend-request.dto';
import { FriendsService } from '../services/friends.service';

@Controller('v1/friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Post('requests')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async requestFriend(@TenantContextParam() tenantContext: TenantContext, @Req() req: Request, @Body() dto: FriendRequestDto) {
    return this.friendsService.requestFriend(tenantContext.effectiveTenantId, req.user?.sub as string, dto);
  }

  @Get('requests')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async listRequests(@TenantContextParam() tenantContext: TenantContext, @Req() req: Request, @Query('status') status = 'all') {
    return this.friendsService.listRequests(tenantContext.effectiveTenantId, req.user?.sub as string, status);
  }

  @Post('requests/:id/accept')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async acceptRequest(@TenantContextParam() tenantContext: TenantContext, @Req() req: Request, @Param('id') requestId: string) {
    return this.friendsService.acceptRequest(tenantContext.effectiveTenantId, req.user?.sub as string, requestId);
  }

  @Post('requests/:id/reject')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async rejectRequest(@TenantContextParam() tenantContext: TenantContext, @Req() req: Request, @Param('id') requestId: string) {
    return this.friendsService.rejectRequest(tenantContext.effectiveTenantId, req.user?.sub as string, requestId);
  }

  @Post('requests/:id/cancel')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async cancelRequest(@TenantContextParam() tenantContext: TenantContext, @Req() req: Request, @Param('id') requestId: string) {
    return this.friendsService.cancelRequest(tenantContext.effectiveTenantId, req.user?.sub as string, requestId);
  }

  @Get()
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async listFriends(@TenantContextParam() tenantContext: TenantContext, @Req() req: Request) {
    return this.friendsService.listFriends(tenantContext.effectiveTenantId, req.user?.sub as string);
  }

  @Post('block')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async block(@TenantContextParam() tenantContext: TenantContext, @Req() req: Request, @Body() dto: { userId: string }) {
    return this.friendsService.blockUser(tenantContext.effectiveTenantId, req.user?.sub as string, dto.userId);
  }

  @Post('unblock')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async unblock(@TenantContextParam() tenantContext: TenantContext, @Req() req: Request, @Body() dto: { userId: string }) {
    return this.friendsService.unblockUser(tenantContext.effectiveTenantId, req.user?.sub as string, dto.userId);
  }

  @Get('blocked')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async listBlocked(@TenantContextParam() tenantContext: TenantContext, @Req() req: Request) {
    return this.friendsService.listBlocked(tenantContext.effectiveTenantId, req.user?.sub as string);
  }

  @Get(':userId/mutual')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async mutual(@TenantContextParam() tenantContext: TenantContext, @Req() req: Request, @Param('userId') userId: string) {
    return this.friendsService.mutualFriends(tenantContext.effectiveTenantId, req.user?.sub as string, userId);
  }
}
