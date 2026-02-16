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
  async sendRequest(
    @TenantContextParam() tenantContext: TenantContext,
    @Req() req: Request,
    @Body() dto: FriendRequestDto,
  ) {
    const userId = req.user?.sub as string;
    return this.friendsService.requestFriend(tenantContext.effectiveTenantId, userId, dto);
  }

  @Get('requests')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async listRequests(
    @TenantContextParam() tenantContext: TenantContext,
    @Req() req: Request,
    @Query('status') status = 'all',
  ) {
    const userId = req.user?.sub as string;
    return this.friendsService.listRequests(tenantContext.effectiveTenantId, userId, status);
  }

  @Post('requests/:id/accept')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async acceptRequest(
    @TenantContextParam() tenantContext: TenantContext,
    @Req() req: Request,
    @Param('id') requestId: string,
  ) {
    const userId = req.user?.sub as string;
    return this.friendsService.acceptRequest(tenantContext.effectiveTenantId, userId, requestId);
  }

  @Post('requests/:id/reject')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async rejectRequest(
    @TenantContextParam() tenantContext: TenantContext,
    @Req() req: Request,
    @Param('id') requestId: string,
  ) {
    const userId = req.user?.sub as string;
    return this.friendsService.rejectRequest(tenantContext.effectiveTenantId, userId, requestId);
  }

  @Post('requests/:id/cancel')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async cancelRequest(
    @TenantContextParam() tenantContext: TenantContext,
    @Req() req: Request,
    @Param('id') requestId: string,
  ) {
    const userId = req.user?.sub as string;
    return this.friendsService.cancelRequest(tenantContext.effectiveTenantId, userId, requestId);
  }

  @Get()
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async listFriends(@TenantContextParam() tenantContext: TenantContext, @Req() req: Request) {
    const userId = req.user?.sub as string;
    return this.friendsService.listFriends(tenantContext.effectiveTenantId, userId);
  }
}
