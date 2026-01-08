import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCallDto } from '../dto/create-call.dto';
import { OutboxService } from './outbox.service';

@Injectable()
export class CallsService {
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
}
