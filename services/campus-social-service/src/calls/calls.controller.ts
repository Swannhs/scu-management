import { Controller, Post, Body, Param } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OutboxService } from '../outbox/outbox.service';
import { TenantId } from '../common/decorators/tenant.decorator';
import { User } from '../common/decorators/user.decorator';
import { CallType, CallStatus } from '@prisma/client';

@Controller('v1')
export class CallsController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly outbox: OutboxService
  ) {}

  @Post('conversations/:id/calls')
  async startCall(@Param('id') id: string, @User() user: any, @Body() data: any, @TenantId() tenantId: string) {
    const call = await this.prisma.callSession.create({
        data: {
            tenantId,
            conversationId: id,
            createdBy: user.sub,
            callType: data.type || CallType.AUDIO,
            providerRoomId: `room-${Date.now()}-${id}`, // Mock
            status: CallStatus.STARTED
        }
    });
    await this.outbox.emit(tenantId, 'social.call.started', call);
    return call;
  }

  @Post('calls/:id/join')
  async joinCall(@Param('id') id: string, @User() user: any, @TenantId() tenantId: string) {
    // Return token
    return { token: 'mock-webrtc-token', roomId: id };
  }

  @Post('calls/:id/end')
  async endCall(@Param('id') id: string, @TenantId() tenantId: string) {
    return this.prisma.callSession.update({
        where: { id },
        data: { status: CallStatus.ENDED, endedAt: new Date() }
    });
  }
}
