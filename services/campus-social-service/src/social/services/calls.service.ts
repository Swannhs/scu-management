import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCallDto } from '../dto/create-call.dto';
import { OutboxService } from './outbox.service';

interface CallRoomState {
  tenantId: string;
  roomId: string;
  type: string;
  targetId: string;
  members: Set<string>;
  status: 'ACTIVE' | 'ENDED';
}

@Injectable()
export class CallsService {
  private readonly callRooms = new Map<string, CallRoomState>();

  constructor(
    private readonly prisma: PrismaService,
    private readonly outbox: OutboxService,
  ) {}

  async startCall(tenantId: string, actorId: string, conversationId: string, dto: CreateCallDto) {
    const membership = await this.prisma.conversationMember.findFirst({ where: { tenantId, conversationId, userId: actorId } });
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
    const session = await this.prisma.callSession.findFirst({ where: { tenantId, id: callId } });
    if (!session) {
      throw new NotFoundException('Call not found');
    }

    const membership = await this.prisma.conversationMember.findFirst({
      where: { tenantId, conversationId: session.conversationId, userId: actorId },
    });
    if (!membership) {
      throw new ForbiddenException('Not a conversation member');
    }

    await this.outbox.publishEvent(tenantId, 'social.call.joined', {
      callId: session.id,
      conversationId: session.conversationId,
      userId: actorId,
    });

    return session;
  }

  async endCall(tenantId: string, actorId: string, callId: string) {
    const session = await this.prisma.callSession.findFirst({ where: { tenantId, id: callId } });
    if (!session) {
      throw new NotFoundException('Call not found');
    }

    const membership = await this.prisma.conversationMember.findFirst({
      where: { tenantId, conversationId: session.conversationId, userId: actorId },
    });
    if (!membership) {
      throw new ForbiddenException('Not a conversation member');
    }

    const updated = await this.prisma.callSession.update({
      where: { id: session.id },
      data: { status: 'ENDED', endedAt: new Date() },
    });

    await this.outbox.publishEvent(tenantId, 'social.call.ended', {
      callId: session.id,
      conversationId: session.conversationId,
      userId: actorId,
    });

    return updated;
  }

  async createRoom(tenantId: string, actorId: string, type: string, targetId: string) {
    const roomId = `${type.toLowerCase()}-${targetId}`;
    const existing = this.callRooms.get(roomId);
    if (existing) {
      existing.members.add(actorId);
      return this.serializeRoom(existing);
    }

    const room: CallRoomState = { tenantId, roomId, type, targetId, members: new Set([actorId]), status: 'ACTIVE' };
    this.callRooms.set(roomId, room);

    await this.outbox.publishEvent(tenantId, 'social.call.room_invite', { roomId, type, targetId, invitedBy: actorId });
    return this.serializeRoom(room);
  }

  async joinRoom(tenantId: string, actorId: string, roomId: string) {
    const room = this.getRoomOrFail(tenantId, roomId);
    room.members.add(actorId);

    await this.outbox.publishEvent(tenantId, 'social.call.room_joined', { roomId, userId: actorId });
    return this.serializeRoom(room);
  }

  async leaveRoom(tenantId: string, actorId: string, roomId: string) {
    const room = this.getRoomOrFail(tenantId, roomId);
    room.members.delete(actorId);

    await this.outbox.publishEvent(tenantId, 'social.call.room_left', { roomId, userId: actorId });
    return this.serializeRoom(room);
  }

  async endRoom(tenantId: string, actorId: string, roomId: string) {
    const room = this.getRoomOrFail(tenantId, roomId);
    room.status = 'ENDED';

    await this.outbox.publishEvent(tenantId, 'social.call.room_ended', { roomId, userId: actorId });
    return this.serializeRoom(room);
  }

  listParticipants(tenantId: string, roomId: string) {
    const room = this.getRoomOrFail(tenantId, roomId);
    return { roomId: room.roomId, participants: Array.from(room.members), status: room.status };
  }

  private getRoomOrFail(tenantId: string, roomId: string): CallRoomState {
    const room = this.callRooms.get(roomId);
    if (!room || room.tenantId !== tenantId) {
      throw new NotFoundException('Room not found');
    }
    return room;
  }

  private serializeRoom(room: CallRoomState) {
    return {
      tenantId: room.tenantId,
      roomId: room.roomId,
      type: room.type,
      targetId: room.targetId,
      status: room.status,
      participants: Array.from(room.members),
    };
  }
}
