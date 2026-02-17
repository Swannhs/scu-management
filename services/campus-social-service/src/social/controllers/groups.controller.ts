import { Body, Controller, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { Roles } from 'nest-keycloak-connect';
import { Request } from 'express';
import { TenantContextParam } from '../../common/tenant-context.decorator';
import type { TenantContext } from '../../common/tenant-context';
import { CreateGroupDto } from '../dto/create-group.dto';
import { UpdateGroupMemberDto } from '../dto/update-group-member.dto';
import { InviteUserDto } from '../dto/invite-user.dto';
import { GroupsService } from '../services/groups.service';

@Controller('v1/groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async listGroups(@TenantContextParam() tenantContext: TenantContext, @Query('query') query?: string, @Query('privacy') privacy?: string) {
    const groups = await this.groupsService.listGroups(tenantContext.effectiveTenantId);
    return groups.filter((group) => {
      const matchesQuery = query ? group.name.toLowerCase().includes(query.toLowerCase()) : true;
      const matchesPrivacy = privacy ? group.visibility === privacy : true;
      return matchesQuery && matchesPrivacy;
    });
  }

  @Post()
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async createGroup(@TenantContextParam() tenantContext: TenantContext, @Req() req: Request, @Body() dto: CreateGroupDto) {
    return this.groupsService.createGroup(tenantContext.effectiveTenantId, req.user?.sub as string, dto, req.user?.realm_access?.roles ?? []);
  }

  @Get(':id')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async getGroup(@TenantContextParam() tenantContext: TenantContext, @Param('id') groupId: string) {
    return this.groupsService.getGroup(tenantContext.effectiveTenantId, groupId);
  }

  @Post(':id/join')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async joinGroup(@TenantContextParam() tenantContext: TenantContext, @Req() req: Request, @Param('id') groupId: string) {
    return this.groupsService.joinGroup(tenantContext.effectiveTenantId, groupId, req.user?.sub as string);
  }

  @Post(':id/leave')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async leaveGroup(@TenantContextParam() tenantContext: TenantContext, @Req() req: Request, @Param('id') groupId: string) {
    return this.groupsService.leaveGroup(tenantContext.effectiveTenantId, groupId, req.user?.sub as string);
  }

  @Get(':id/requests')
  @Roles({ roles: ['TENANT_ADMIN', 'STUDENT', 'FACULTY'] })
  async listJoinRequests(@TenantContextParam() tenantContext: TenantContext, @Param('id') groupId: string) {
    return this.groupsService.listJoinRequests(tenantContext.effectiveTenantId, groupId);
  }

  @Post(':id/requests/:userId/approve')
  @Roles({ roles: ['TENANT_ADMIN', 'STUDENT', 'FACULTY'] })
  async approveJoinRequest(@TenantContextParam() tenantContext: TenantContext, @Param('id') groupId: string, @Param('userId') userId: string) {
    return this.groupsService.approveJoinRequest(tenantContext.effectiveTenantId, groupId, userId);
  }

  @Post(':id/requests/:userId/reject')
  @Roles({ roles: ['TENANT_ADMIN', 'STUDENT', 'FACULTY'] })
  async rejectJoinRequest(@TenantContextParam() tenantContext: TenantContext, @Param('id') groupId: string, @Param('userId') userId: string) {
    return this.groupsService.rejectJoinRequest(tenantContext.effectiveTenantId, groupId, userId);
  }

  @Post(':id/invite')
  @Roles({ roles: ['TENANT_ADMIN', 'STUDENT', 'FACULTY'] })
  async inviteUser(@TenantContextParam() tenantContext: TenantContext, @Req() req: Request, @Param('id') groupId: string, @Body() dto: InviteUserDto) {
    return this.groupsService.inviteUser(tenantContext.effectiveTenantId, groupId, req.user?.sub as string, dto);
  }

  @Get(':id/invites')
  @Roles({ roles: ['TENANT_ADMIN', 'STUDENT', 'FACULTY'] })
  async listInvites(@TenantContextParam() tenantContext: TenantContext, @Param('id') groupId: string) {
    return this.groupsService.listInvites(tenantContext.effectiveTenantId, groupId);
  }

  @Post(':id/invites/:inviteId/accept')
  @Roles({ roles: ['TENANT_ADMIN', 'STUDENT', 'FACULTY'] })
  async acceptInvite(@TenantContextParam() tenantContext: TenantContext, @Req() req: Request, @Param('inviteId') inviteId: string) {
    return this.groupsService.acceptInvite(tenantContext.effectiveTenantId, req.user?.sub as string, inviteId);
  }

  @Post(':id/invites/:inviteId/reject')
  @Roles({ roles: ['TENANT_ADMIN', 'STUDENT', 'FACULTY'] })
  async rejectInvite(@TenantContextParam() tenantContext: TenantContext, @Req() req: Request, @Param('inviteId') inviteId: string) {
    return this.groupsService.rejectInvite(tenantContext.effectiveTenantId, req.user?.sub as string, inviteId);
  }

  @Get(':id/members')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async listMembers(@TenantContextParam() tenantContext: TenantContext, @Param('id') groupId: string) {
    return this.groupsService.listMembers(tenantContext.effectiveTenantId, groupId);
  }

  @Patch(':id/members/:userId')
  @Roles({ roles: ['TENANT_ADMIN'] })
  async patchMember(@TenantContextParam() tenantContext: TenantContext, @Param('id') groupId: string, @Param('userId') userId: string, @Body() dto: UpdateGroupMemberDto) {
    return this.groupsService.updateMember(tenantContext.effectiveTenantId, groupId, userId, dto);
  }

  @Get(':id/posts')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async listGroupPosts(@TenantContextParam() tenantContext: TenantContext, @Param('id') groupId: string) {
    return this.groupsService.listGroupPosts(tenantContext.effectiveTenantId, groupId);
  }
}
