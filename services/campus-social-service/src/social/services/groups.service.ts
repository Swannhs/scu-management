import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { GroupType } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateGroupDto } from '../dto/create-group.dto';

@Injectable()
export class GroupsService {
  constructor(private readonly prisma: PrismaService) {}

  async listGroups(tenantId: string) {
    return this.prisma.group.findMany({
      where: { tenantId },
    });
  }

  async createGroup(tenantId: string, actorId: string, dto: CreateGroupDto, roles: string[]) {
    if (dto.type !== GroupType.CLUB) {
      throw new BadRequestException('Only CLUB groups can be created manually');
    }

    if (!roles.includes('STUDENT')) {
      throw new ForbiddenException('Only students can create club groups');
    }

    const group = await this.prisma.group.create({
      data: {
        tenantId,
        type: dto.type,
        name: dto.name,
        visibility: dto.visibility,
      },
    });

    await this.prisma.groupMember.create({
      data: {
        tenantId,
        groupId: group.id,
        userId: actorId,
        role: 'ADMIN',
      },
    });

    return group;
  }

  async joinGroup(tenantId: string, groupId: string, actorId: string) {
    return this.prisma.groupMember.upsert({
      where: {
        tenantId_groupId_userId: {
          tenantId,
          groupId,
          userId: actorId,
        },
      },
      update: {},
      create: {
        tenantId,
        groupId,
        userId: actorId,
      },
    });
  }

  async leaveGroup(tenantId: string, groupId: string, actorId: string) {
    return this.prisma.groupMember.deleteMany({
      where: {
        tenantId,
        groupId,
        userId: actorId,
      },
    });
  }

  async listGroupPosts(tenantId: string, groupId: string) {
    return this.prisma.post.findMany({
      where: {
        tenantId,
        targetType: 'GROUP',
        targetId: groupId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async ensureCourseGroup(tenantId: string, courseOfferingId: string, name: string) {
    return this.prisma.group.upsert({
      where: { id: courseOfferingId },
      update: {
        name,
        type: GroupType.COURSE,
      },
      create: {
        id: courseOfferingId,
        tenantId,
        type: GroupType.COURSE,
        name,
        visibility: 'PRIVATE',
      },
    });
  }

  async autoJoinCourseGroup(tenantId: string, courseOfferingId: string, userId: string) {
    return this.prisma.groupMember.upsert({
      where: {
        tenantId_groupId_userId: {
          tenantId,
          groupId: courseOfferingId,
          userId,
        },
      },
      update: {},
      create: {
        tenantId,
        groupId: courseOfferingId,
        userId,
      },
    });
  }

  async getGroup(tenantId: string, groupId: string) {
    return this.prisma.group.findFirst({ where: { tenantId, id: groupId } });
  }

  async listMembers(tenantId: string, groupId: string) {
    return this.prisma.groupMember.findMany({ where: { tenantId, groupId } });
  }

  async updateMember(tenantId: string, groupId: string, userId: string, data: { role?: string }) {
    return this.prisma.groupMember.update({
      where: { tenantId_groupId_userId: { tenantId, groupId, userId } },
      data: { ...(data.role ? { role: data.role as any } : {}) },
    });
  }

}
