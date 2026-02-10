import { Body, Controller, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { Roles } from 'nest-keycloak-connect';
import { Request } from 'express';
import { TenantContextParam } from '../../common/tenant-context.decorator';
import { TenantContext } from '../../common/tenant-context';
import { CreateGroupDto } from '../dto/create-group.dto';
import { UpdateGroupMemberDto } from '../dto/update-group-member.dto';
import { GroupsService } from '../services/groups.service';

@Controller('v1/groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async listGroups(
    @TenantContextParam() tenantContext: TenantContext,
    @Query('query') query?: string,
    @Query('privacy') privacy?: string,
  ) {
    const groups = await this.groupsService.listGroups(tenantContext.effectiveTenantId);
    return groups.filter((group) => {
      const matchesQuery = query ? group.name.toLowerCase().includes(query.toLowerCase()) : true;
      const matchesPrivacy = privacy ? group.visibility === privacy : true;
      return matchesQuery && matchesPrivacy;
    });
  }

  @Post()
  @Roles({ roles: ['STUDENT'] })
  async createGroup(
    @TenantContextParam() tenantContext: TenantContext,
    @Req() req: Request,
    @Body() dto: CreateGroupDto,
  ) {
    const userId = req.user?.sub as string;
    const roles = req.user?.realm_access?.roles ?? [];
    return this.groupsService.createGroup(tenantContext.effectiveTenantId, userId, dto, roles);
  }

  @Get(':id')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async getGroup(@TenantContextParam() tenantContext: TenantContext, @Param('id') groupId: string) {
    return this.groupsService.getGroup(tenantContext.effectiveTenantId, groupId);
  }

  @Post(':id/join')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async joinGroup(
    @TenantContextParam() tenantContext: TenantContext,
    @Req() req: Request,
    @Param('id') groupId: string,
  ) {
    const userId = req.user?.sub as string;
    return this.groupsService.joinGroup(tenantContext.effectiveTenantId, groupId, userId);
  }

  @Post(':id/leave')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async leaveGroup(
    @TenantContextParam() tenantContext: TenantContext,
    @Req() req: Request,
    @Param('id') groupId: string,
  ) {
    const userId = req.user?.sub as string;
    return this.groupsService.leaveGroup(tenantContext.effectiveTenantId, groupId, userId);
  }

  @Get(':id/members')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async listMembers(@TenantContextParam() tenantContext: TenantContext, @Param('id') groupId: string) {
    return this.groupsService.listMembers(tenantContext.effectiveTenantId, groupId);
  }

  @Patch(':id/members/:userId')
  @Roles({ roles: ['TENANT_ADMIN'] })
  async patchMember(
    @TenantContextParam() tenantContext: TenantContext,
    @Param('id') groupId: string,
    @Param('userId') userId: string,
    @Body() dto: UpdateGroupMemberDto,
  ) {
    return this.groupsService.updateMember(tenantContext.effectiveTenantId, groupId, userId, dto);
  }

  @Post(':id/requests/:userId/approve')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async approveRequest(
    @TenantContextParam() tenantContext: TenantContext,
    @Req() req: Request,
    @Param('id') groupId: string,
    @Param('userId') userId: string,
  ) {
    const approverId = req.user?.sub as string;
    return this.groupsService.approveJoinRequest(tenantContext.effectiveTenantId, groupId, approverId, userId);
  }

  @Post(':id/requests/:userId/reject')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async rejectRequest(
    @TenantContextParam() tenantContext: TenantContext,
    @Req() req: Request,
    @Param('id') groupId: string,
    @Param('userId') userId: string,
  ) {
    const approverId = req.user?.sub as string;
    return this.groupsService.rejectJoinRequest(tenantContext.effectiveTenantId, groupId, approverId, userId);
  }

  @Get(':id/posts')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async listGroupPosts(
    @TenantContextParam() tenantContext: TenantContext,
    @Param('id') groupId: string,
  ) {
    return this.groupsService.listGroupPosts(tenantContext.effectiveTenantId, groupId);
  }
}
