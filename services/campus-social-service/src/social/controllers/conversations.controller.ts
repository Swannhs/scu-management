import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { Roles } from 'nest-keycloak-connect';
import { Request } from 'express';
import { TenantContextParam } from '../../common/tenant-context.decorator';
import { TenantContext } from '../../common/tenant-context';
import { CreateDirectConversationDto } from '../dto/create-direct-conversation.dto';
import { CreateMessageDto } from '../dto/create-message.dto';
import { ConversationsService } from '../services/conversations.service';

@Controller('v1/conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Post('direct')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async createDirect(
    @TenantContextParam() tenantContext: TenantContext,
    @Req() req: Request,
    @Body() dto: CreateDirectConversationDto,
  ) {
    const userId = req.user?.sub as string;
    return this.conversationsService.createDirectConversation(tenantContext.effectiveTenantId, userId, dto);
  }

  @Get()
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async listConversations(
    @TenantContextParam() tenantContext: TenantContext,
    @Req() req: Request,
  ) {
    const userId = req.user?.sub as string;
    return this.conversationsService.listConversations(tenantContext.effectiveTenantId, userId);
  }

  @Get(':id/messages')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async listMessages(
    @TenantContextParam() tenantContext: TenantContext,
    @Req() req: Request,
    @Param('id') conversationId: string,
  ) {
    const userId = req.user?.sub as string;
    return this.conversationsService.listMessages(tenantContext.effectiveTenantId, userId, conversationId);
  }

  @Post(':id/messages')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async sendMessage(
    @TenantContextParam() tenantContext: TenantContext,
    @Req() req: Request,
    @Param('id') conversationId: string,
    @Body() dto: CreateMessageDto,
  ) {
    const userId = req.user?.sub as string;
    return this.conversationsService.sendMessage(tenantContext.effectiveTenantId, userId, conversationId, dto);
  }
}
