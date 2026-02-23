import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { GroupMemberRole, GroupType } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateGroupDto } from '../dto/create-group.dto';
import { InviteUserDto } from '../dto/invite-user.dto';

@Injectable()
export class GroupsService {
  constructor(private readonly prisma: PrismaService) {}

  async listGroups(tenantId: string) {
    return this.prisma.group.findMany({ where: { tenantId } });
  }

  async createGroup(tenantId: string, actorId: string, dto: CreateGroupDto, roles: string[]) {
    if (dto.type !== GroupType.CLUB) throw new BadRequestException('Only CLUB groups can be created manually');
    if (!roles.some((r) => ['STUDENT', 'FACULTY', 'TENANT_ADMIN'].includes(r))) {
      throw new ForbiddenException('Only student/faculty/admin can create club groups');
    }

    const group = await this.prisma.group.create({ data: { tenantId, type: dto.type, name: dto.name, visibility: dto.visibility } });
    await this.prisma.groupMember.create({ data: { tenantId, groupId: group.id, userId: actorId, role: 'ADMIN', status: 'ACTIVE' } });
    return group;
  }

  async joinGroup(tenantId: string, groupId: string, actorId: string) {
    const group = await this.getGroup(tenantId, groupId);
    const status = group.visibility === 'PUBLIC' ? 'ACTIVE' : 'PENDING';
    return this.prisma.groupMember.upsert({
      where: { tenantId_groupId_userId: { tenantId, groupId, userId: actorId } },
      update: { status },
      create: { tenantId, groupId, userId: actorId, status },
    });
  }

  async listJoinRequests(tenantId: string, groupId: string) {
    return this.prisma.groupMember.findMany({ where: { tenantId, groupId, status: 'PENDING' } });
  }

  async approveJoinRequest(tenantId: string, groupId: string, userId: string) {
    return this.prisma.groupMember.update({ where: { tenantId_groupId_userId: { tenantId, groupId, userId } }, data: { status: 'ACTIVE' } });
  }

  async rejectJoinRequest(tenantId: string, groupId: string, userId: string) {
    return this.prisma.groupMember.deleteMany({ where: { tenantId, groupId, userId, status: 'PENDING' } });
  }

  async inviteUser(tenantId: string, groupId: string, inviterId: string, dto: InviteUserDto) {
    const invite = await (this.prisma as any).groupInvite.create({ data: { tenantId, groupId, inviterId, userId: dto.userId, status: 'PENDING' } });
    await this.prisma.notification.create({ data: { tenantId, userId: dto.userId, type: 'GROUP_INVITE', payload: { groupId, inviteId: invite.id } } });
    return invite;
  }

  async listInvites(tenantId: string, groupId: string) {
    return (this.prisma as any).groupInvite.findMany({ where: { tenantId, groupId }, orderBy: { createdAt: 'desc' } });
  }

  async acceptInvite(tenantId: string, actorId: string, inviteId: string) {
    const invite = await (this.prisma as any).groupInvite.findFirst({ where: { tenantId, id: inviteId, userId: actorId } });
    if (!invite) throw new NotFoundException('Invite not found');
    await (this.prisma as any).groupInvite.updateMany({ where: { tenantId, id: inviteId }, data: { status: 'ACCEPTED' } });
    await this.prisma.groupMember.upsert({ where: { tenantId_groupId_userId: { tenantId, groupId: invite.groupId, userId: actorId } }, update: { status: 'ACTIVE' }, create: { tenantId, groupId: invite.groupId, userId: actorId, status: 'ACTIVE' } });
    return { status: 'accepted' };
  }

  async rejectInvite(tenantId: string, actorId: string, inviteId: string) {
    const invite = await (this.prisma as any).groupInvite.findFirst({ where: { tenantId, id: inviteId, userId: actorId } });
    if (!invite) throw new NotFoundException('Invite not found');
    await (this.prisma as any).groupInvite.updateMany({ where: { tenantId, id: inviteId }, data: { status: 'REJECTED' } });
    return { status: 'rejected' };
  }

  async leaveGroup(tenantId: string, groupId: string, actorId: string) {
    return this.prisma.groupMember.deleteMany({ where: { tenantId, groupId, userId: actorId } });
  }

  async listGroupPosts(tenantId: string, groupId: string) {
    return this.prisma.post.findMany({ where: { tenantId, targetType: 'GROUP', targetId: groupId }, orderBy: { createdAt: 'desc' } });
  }

  async ensureCourseGroup(tenantId: string, courseOfferingId: string, name: string) {
    return this.prisma.group.upsert({
      where: { tenantId_externalRefId: { tenantId, externalRefId: courseOfferingId } },
      update: { name, type: GroupType.COURSE },
      create: { tenantId, externalRefId: courseOfferingId, type: GroupType.COURSE, name, visibility: 'PRIVATE' },
    });
  }

  async autoJoinCourseGroup(tenantId: string, courseOfferingId: string, studentId: string) {
    const courseGroup = await this.prisma.group.findFirst({ where: { tenantId, externalRefId: courseOfferingId } });
    if (!courseGroup) throw new NotFoundException('Course group not found');
    await this.prisma.groupMember.upsert({
      where: { tenantId_groupId_userId: { tenantId, groupId: courseGroup.id, userId: studentId } },
      update: { status: 'ACTIVE' },
      create: { tenantId, groupId: courseGroup.id, userId: studentId, role: GroupMemberRole.MEMBER, status: 'ACTIVE' },
    });
  }

  async getGroup(tenantId: string, groupId: string) {
    const group = await this.prisma.group.findFirst({ where: { tenantId, id: groupId } });
    if (!group) throw new NotFoundException('Group not found');
    return group;
  }

  async listMembers(tenantId: string, groupId: string) {
    return this.prisma.groupMember.findMany({ where: { tenantId, groupId } });
  }

  async updateMember(tenantId: string, groupId: string, userId: string, dto: { role?: GroupMemberRole }) {
    return this.prisma.groupMember.update({ where: { tenantId_groupId_userId: { tenantId, groupId, userId } }, data: { role: dto.role } });
  }
}
