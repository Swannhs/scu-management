import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { Roles } from 'nest-keycloak-connect';
import { Request } from 'express';
import { TenantContextParam } from '../../common/tenant-context.decorator';
import { TenantContext } from '../../common/tenant-context';
import { CreateGroupDto } from '../dto/create-group.dto';
import { GroupsService } from '../services/groups.service';

@Controller('v1/groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async listGroups(@TenantContextParam() tenantContext: TenantContext) {
    return this.groupsService.listGroups(tenantContext.effectiveTenantId);
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

  @Get(':id/posts')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async listGroupPosts(
    @TenantContextParam() tenantContext: TenantContext,
    @Param('id') groupId: string,
  ) {
    return this.groupsService.listGroupPosts(tenantContext.effectiveTenantId, groupId);
  }
}
