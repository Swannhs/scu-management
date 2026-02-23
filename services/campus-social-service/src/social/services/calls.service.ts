import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCallDto } from '../dto/create-call.dto';
import { OutboxService } from './outbox.service';

@Injectable()
export class CallsService {
  private readonly callRooms = new Map<string, { tenantId: string; roomId: string; type: string; targetId: string; members: Set<string> }>();
  constructor(
    private readonly prisma: PrismaService,
    private readonly outbox: OutboxService,
  ) {}

  async startCall(tenantId: string, actorId: string, conversationId: string, dto: CreateCallDto) {
    const membership = await this.prisma.conversationMember.findFirst({ where: { tenantId, conversationId, userId: actorId } });
    if (!membership) throw new ForbiddenException('Not a conversation member');

    const session = await this.prisma.callSession.create({ data: { tenantId, conversationId, createdBy: actorId, callType: dto.callType, providerRoomId: dto.providerRoomId, status: 'ACTIVE' } });
    await this.outbox.publishEvent(tenantId, 'social.call.started', { callId: session.id, conversationId, createdBy: actorId, callType: session.callType });
    return session;
  }

  async joinCall(tenantId: string, actorId: string, callId: string) {
    const session = await this.prisma.callSession.findFirst({ where: { tenantId, id: callId } });
    if (!session) throw new NotFoundException('Call not found');
    const membership = await this.prisma.conversationMember.findFirst({ where: { tenantId, conversationId: session.conversationId, userId: actorId } });
    if (!membership) throw new ForbiddenException('Not a conversation member');
    return session;
  }

  async endCall(tenantId: string, actorId: string, callId: string) {
    const session = await this.prisma.callSession.findFirst({ where: { tenantId, id: callId } });
    if (!session) throw new NotFoundException('Call not found');
    const membership = await this.prisma.conversationMember.findFirst({ where: { tenantId, conversationId: session.conversationId, userId: actorId } });
    if (!membership) throw new ForbiddenException('Not a conversation member');
    await this.prisma.callSession.updateMany({ where: { tenantId, id: session.id }, data: { status: 'ENDED', endedAt: new Date() } });
    return this.prisma.callSession.findFirst({ where: { tenantId, id: session.id } });
  }

  async createRoom(tenantId: string, actorId: string, type: string, targetId: string) {
    const roomId = `${type.toLowerCase()}-${targetId}`;
    const existing = this.callRooms.get(roomId);
    if (existing) {
      existing.members.add(actorId);
      return existing;
    }

    const room = { tenantId, roomId, type, targetId, members: new Set([actorId]) };
    this.callRooms.set(roomId, room);
    await (this.prisma as any).callParticipant.upsert({ where: { tenantId_roomId_userId: { tenantId, roomId, userId: actorId } }, update: { leftAt: null }, create: { tenantId, roomId, userId: actorId } });
    return room;
  }

  async joinRoom(tenantId: string, actorId: string, roomId: string) {
    const room = this.callRooms.get(roomId);
    if (!room || room.tenantId !== tenantId) throw new NotFoundException('Room not found');
    room.members.add(actorId);
    await (this.prisma as any).callParticipant.upsert({ where: { tenantId_roomId_userId: { tenantId, roomId, userId: actorId } }, update: { leftAt: null }, create: { tenantId, roomId, userId: actorId } });
    return room;
  }

  async leaveRoom(tenantId: string, actorId: string, roomId: string) {
    const room = this.callRooms.get(roomId);
    if (!room || room.tenantId !== tenantId) throw new NotFoundException('Room not found');
    room.members.delete(actorId);
    await (this.prisma as any).callParticipant.updateMany({ where: { tenantId, roomId, userId: actorId }, data: { leftAt: new Date() } });
    return room;
  }

  async participants(tenantId: string, roomId: string) {
    return (this.prisma as any).callParticipant.findMany({ where: { tenantId, roomId, leftAt: null } });
  }

  async invite(tenantId: string, roomId: string, actorId: string, userIds: string[]) {
    await Promise.all(userIds.map((userId) => this.prisma.notification.create({ data: { tenantId, userId, type: 'CALL_INVITE', payload: { roomId, invitedBy: actorId } } })));
    return { invited: userIds.length };
  }

  async isActiveParticipant(tenantId: string, roomId: string, userId: string) {
    const participant = await (this.prisma as any).callParticipant.findFirst({
      where: { tenantId, roomId, userId, leftAt: null },
    });
    return !!participant;
  }

  async ensureCanJoinRoom(tenantId: string, roomId: string, userId: string) {
    const allowed = await this.isActiveParticipant(tenantId, roomId, userId);
    if (!allowed) {
      throw new ForbiddenException('Not allowed to join call room');
    }
    return true;
  }

}
