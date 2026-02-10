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
    const membership = await this.prisma.conversationMember.findFirst({
      where: { tenantId, conversationId, userId: actorId },
    });

    if (!membership) {
      throw new ForbiddenException('Not a conversation member');
    }

    const session = await this.prisma.callSession.create({
      data: {
        tenantId,
        conversationId,
        createdBy: actorId,
        callType: dto.callType,
        providerRoomId: dto.providerRoomId,
        status: 'ACTIVE',
      },
    });

    await this.outbox.publishEvent(tenantId, 'social.call.started', {
      callId: session.id,
      conversationId,
      createdBy: actorId,
      callType: session.callType,
    });

    return session;
  }

  async joinCall(tenantId: string, actorId: string, callId: string) {
    const session = await this.prisma.callSession.findFirst({
      where: { tenantId, id: callId },
    });

    if (!session) {
      throw new NotFoundException('Call not found');
    }

    const membership = await this.prisma.conversationMember.findFirst({
      where: { tenantId, conversationId: session.conversationId, userId: actorId },
    });

    if (!membership) {
      throw new ForbiddenException('Not a conversation member');
    }

    return session;
  }

  async endCall(tenantId: string, actorId: string, callId: string) {
    const session = await this.prisma.callSession.findFirst({
      where: { tenantId, id: callId },
    });

    if (!session) {
      throw new NotFoundException('Call not found');
    }

    const membership = await this.prisma.conversationMember.findFirst({
      where: { tenantId, conversationId: session.conversationId, userId: actorId },
    });

    if (!membership) {
      throw new ForbiddenException('Not a conversation member');
    }

    return this.prisma.callSession.update({
      where: { id: session.id },
      data: { status: 'ENDED', endedAt: new Date() },
    });
  }

  createRoom(tenantId: string, actorId: string, type: string, targetId: string) {
    const roomId = `${type.toLowerCase()}-${targetId}`;
    const existing = this.callRooms.get(roomId);
    if (existing) {
      existing.members.add(actorId);
      return existing;
    }

    const room = { tenantId, roomId, type, targetId, members: new Set([actorId]) };
    this.callRooms.set(roomId, room);
    return room;
  }

  joinRoom(tenantId: string, actorId: string, roomId: string) {
    const room = this.callRooms.get(roomId);
    if (!room || room.tenantId !== tenantId) {
      throw new NotFoundException('Room not found');
    }
    room.members.add(actorId);
    return room;
  }

  leaveRoom(tenantId: string, actorId: string, roomId: string) {
    const room = this.callRooms.get(roomId);
    if (!room || room.tenantId !== tenantId) {
      throw new NotFoundException('Room not found');
    }
    room.members.delete(actorId);
    return room;
  }

}
