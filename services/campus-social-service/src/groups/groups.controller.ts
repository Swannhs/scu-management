import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TenantId } from '../common/decorators/tenant.decorator';
import { User } from '../common/decorators/user.decorator';
import { GroupType, GroupRole } from '@prisma/client';

@Controller('v1/groups')
export class GroupsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getGroups(@TenantId() tenantId: string) {
    return this.prisma.group.findMany({
      where: { tenantId }, // Add visibility filter if needed
    });
  }

  @Post()
  async createGroup(@User() user: any, @Body() data: any, @TenantId() tenantId: string) {
    // Only CLUB can be created by students typically, others by admin/system
    // Assuming type is checked.
    return this.prisma.group.create({
      data: {
        tenantId,
        name: data.name,
        type: data.type || GroupType.CLUB,
        visibility: data.visibility,
        members: {
            create: {
                tenantId,
                userId: user.sub,
                role: GroupRole.ADMIN
            }
        }
      },
    });
  }

  @Post(':id/join')
  async joinGroup(@Param('id') id: string, @User() user: any, @TenantId() tenantId: string) {
    // Check if group is public or allows joining
    return this.prisma.groupMember.create({
        data: {
            tenantId,
            groupId: id,
            userId: user.sub,
            role: GroupRole.MEMBER
        }
    });
  }

  @Post(':id/leave')
  async leaveGroup(@Param('id') id: string, @User() user: any, @TenantId() tenantId: string) {
    return this.prisma.groupMember.deleteMany({
        where: {
            tenantId,
            groupId: id,
            userId: user.sub
        }
    });
  }
}
