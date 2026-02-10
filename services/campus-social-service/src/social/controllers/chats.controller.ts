import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { Roles } from 'nest-keycloak-connect';
import { Request } from 'express';
import { TenantContextParam } from '../../common/tenant-context.decorator';
import { TenantContext } from '../../common/tenant-context';
import { CreateDirectConversationDto } from '../dto/create-direct-conversation.dto';
import { CreateMessageDto } from '../dto/create-message.dto';
import { GetMessagesDto } from '../dto/get-messages.dto';
import { ConversationsService } from '../services/conversations.service';

@Controller('v1')
export class ChatsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Post('chats/dm')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async createDm(
    @TenantContextParam() tenantContext: TenantContext,
    @Req() req: Request,
    @Body() body: { userId: string },
  ) {
    const userId = req.user?.sub as string;
    const dto: CreateDirectConversationDto = { recipientId: body.userId };
    return this.conversationsService.createDirectConversation(tenantContext.effectiveTenantId, userId, dto);
  }

  @Post('groups/:groupId/chat')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async createGroupChat(
    @TenantContextParam() tenantContext: TenantContext,
    @Req() req: Request,
    @Param('groupId') groupId: string,
  ) {
    const userId = req.user?.sub as string;
    return this.conversationsService.createGroupConversation(tenantContext.effectiveTenantId, userId, {
      name: 'Group chat',
      recipientIds: [],
    });
  }

  @Get('chats')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async listChats(@TenantContextParam() tenantContext: TenantContext, @Req() req: Request) {
    const userId = req.user?.sub as string;
    return this.conversationsService.listConversations(tenantContext.effectiveTenantId, userId);
  }

  @Get('chats/:chatId/messages')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async listMessages(
    @TenantContextParam() tenantContext: TenantContext,
    @Req() req: Request,
    @Param('chatId') chatId: string,
    @Query() query: GetMessagesDto,
  ) {
    const userId = req.user?.sub as string;
    return this.conversationsService.listMessages(tenantContext.effectiveTenantId, userId, chatId, query);
  }

  @Post('chats/:chatId/messages')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async sendMessage(
    @TenantContextParam() tenantContext: TenantContext,
    @Req() req: Request,
    @Param('chatId') chatId: string,
    @Body() body: { content: string },
  ) {
    const userId = req.user?.sub as string;
    const dto: CreateMessageDto = { text: body.content };
    return this.conversationsService.sendMessage(tenantContext.effectiveTenantId, userId, chatId, dto);
  }
}
