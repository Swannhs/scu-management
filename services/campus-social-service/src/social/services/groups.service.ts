import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { GroupType, GroupVisibility } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateGroupDto } from '../dto/create-group.dto';

@Injectable()
export class GroupsService {
  private readonly joinRequests = new Map<string, { tenantId: string; groupId: string; userId: string }>();

  constructor(private readonly prisma: PrismaService) {}

  async listGroups(tenantId: string) {
    return this.prisma.group.findMany({ where: { tenantId } });
  }

  async createGroup(tenantId: string, actorId: string, dto: CreateGroupDto, roles: string[]) {
    if (dto.type !== GroupType.CLUB) {
      throw new BadRequestException('Only CLUB groups can be created manually');
    }
    if (!roles.includes('STUDENT')) {
      throw new ForbiddenException('Only students can create club groups');
    }

    const group = await this.prisma.group.create({
      data: { tenantId, type: dto.type, name: dto.name, visibility: dto.visibility },
    });

    await this.prisma.groupMember.create({
      data: { tenantId, groupId: group.id, userId: actorId, role: 'ADMIN' },
    });

    return group;
  }

  async joinGroup(tenantId: string, groupId: string, actorId: string) {
    const group = await this.getGroup(tenantId, groupId);
    if (!group) {
      throw new NotFoundException('Group not found');
    }

    if (group.visibility === GroupVisibility.PUBLIC) {
      return this.prisma.groupMember.upsert({
        where: { tenantId_groupId_userId: { tenantId, groupId, userId: actorId } },
        update: {},
        create: { tenantId, groupId, userId: actorId },
      });
    }

    const requestKey = `${tenantId}:${groupId}:${actorId}`;
    this.joinRequests.set(requestKey, { tenantId, groupId, userId: actorId });
    return { status: 'PENDING', groupId, userId: actorId };
  }

  async approveJoinRequest(tenantId: string, groupId: string, approverId: string, userId: string) {
    await this.assertAdmin(tenantId, groupId, approverId);
    const requestKey = `${tenantId}:${groupId}:${userId}`;
    if (!this.joinRequests.has(requestKey)) {
      throw new NotFoundException('Join request not found');
    }
    this.joinRequests.delete(requestKey);

    return this.prisma.groupMember.upsert({
      where: { tenantId_groupId_userId: { tenantId, groupId, userId } },
      update: {},
      create: { tenantId, groupId, userId },
    });
  }

  async rejectJoinRequest(tenantId: string, groupId: string, approverId: string, userId: string) {
    await this.assertAdmin(tenantId, groupId, approverId);
    const requestKey = `${tenantId}:${groupId}:${userId}`;
    this.joinRequests.delete(requestKey);
    return { status: 'REJECTED', groupId, userId };
  }

  async leaveGroup(tenantId: string, groupId: string, actorId: string) {
    return this.prisma.groupMember.deleteMany({ where: { tenantId, groupId, userId: actorId } });
  }

  async listGroupPosts(tenantId: string, groupId: string) {
    return this.prisma.post.findMany({
      where: { tenantId, targetType: 'GROUP', targetId: groupId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async ensureCourseGroup(tenantId: string, courseOfferingId: string, name: string) {
    return this.prisma.group.upsert({
      where: { id: courseOfferingId },
      update: { name, type: GroupType.COURSE },
      create: { id: courseOfferingId, tenantId, type: GroupType.COURSE, name, visibility: 'PRIVATE' },
    });
  }

  async autoJoinCourseGroup(tenantId: string, courseOfferingId: string, userId: string) {
    return this.prisma.groupMember.upsert({
      where: { tenantId_groupId_userId: { tenantId, groupId: courseOfferingId, userId } },
      update: {},
      create: { tenantId, groupId: courseOfferingId, userId },
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

  private async assertAdmin(tenantId: string, groupId: string, userId: string) {
    const member = await this.prisma.groupMember.findFirst({ where: { tenantId, groupId, userId } });
    if (!member || member.role !== 'ADMIN') {
      throw new ForbiddenException('Only group admins can moderate membership requests');
    }
  }
}
