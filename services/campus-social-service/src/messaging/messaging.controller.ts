import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OutboxService } from '../outbox/outbox.service';
import { TenantId } from '../common/decorators/tenant.decorator';
import { User } from '../common/decorators/user.decorator';
import { ConversationType } from '@prisma/client';

@Controller('v1/conversations')
export class MessagingController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly outbox: OutboxService
  ) {}

  @Get()
  async getConversations(@User() user: any, @TenantId() tenantId: string) {
    return this.prisma.conversation.findMany({
        where: {
            tenantId,
            members: { some: { userId: user.sub } }
        },
        include: { members: true, messages: { take: 1, orderBy: { createdAt: 'desc' } } }
    });
  }

  @Post('direct')
  async createDirect(@User() user: any, @Body('targetUserId') targetUserId: string, @TenantId() tenantId: string) {
    // Check existing
    // This is complex in Prisma without raw SQL for "exact match of members", simplified here:
    // Create new for now or assume ID passed.
    // Ideally check if Conversation exists with type DIRECT and these 2 members.

    const conv = await this.prisma.conversation.create({
        data: {
            tenantId,
            type: ConversationType.DIRECT,
            members: {
                create: [
                    { tenantId, userId: user.sub },
                    { tenantId, userId: targetUserId }
                ]
            }
        }
    });
    return conv;
  }

  @Get(':id/messages')
  async getMessages(@Param('id') id: string, @TenantId() tenantId: string) {
    return this.prisma.message.findMany({
        where: { tenantId, conversationId: id },
        orderBy: { createdAt: 'asc' }
    });
  }

  @Post(':id/messages')
  async sendMessage(@Param('id') id: string, @User() user: any, @Body() data: any, @TenantId() tenantId: string) {
    const msg = await this.prisma.message.create({
        data: {
            tenantId,
            conversationId: id,
            senderId: user.sub,
            text: data.text,
            fileId: data.fileId
        }
    });
    await this.outbox.emit(tenantId, 'social.message.sent', msg);
    return msg;
  }
}
