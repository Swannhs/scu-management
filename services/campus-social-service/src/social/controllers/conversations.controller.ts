import { Body, Controller, Delete, Get, Param, Post, Query, Req } from '@nestjs/common';
import { Roles } from 'nest-keycloak-connect';
import { Request } from 'express';
import { TenantContextParam } from '../../common/tenant-context.decorator';
import { TenantContext } from '../../common/tenant-context';
import { CreateDirectConversationDto } from '../dto/create-direct-conversation.dto';
import { CreateGroupConversationDto } from '../dto/create-group-conversation.dto';
import { CreateMessageDto } from '../dto/create-message.dto';
import { AddMembersDto } from '../dto/add-members.dto';
import { GetMessagesDto } from '../dto/get-messages.dto';
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
    const userId = (req as any).user?.sub as string;
    return this.conversationsService.createDirectConversation(tenantContext.effectiveTenantId, userId, dto);
  }

  @Post('group')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async createGroup(
    @TenantContextParam() tenantContext: TenantContext,
    @Req() req: Request,
    @Body() dto: CreateGroupConversationDto,
  ) {
    const userId = (req as any).user?.sub as string;
    return this.conversationsService.createGroupConversation(tenantContext.effectiveTenantId, userId, dto);
  }

  @Get()
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async listConversations(
    @TenantContextParam() tenantContext: TenantContext,
    @Req() req: Request,
  ) {
    const userId = (req as any).user?.sub as string;
    return this.conversationsService.listConversations(tenantContext.effectiveTenantId, userId);
  }

  @Get(':id/messages')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async listMessages(
    @TenantContextParam() tenantContext: TenantContext,
    @Req() req: Request,
    @Param('id') conversationId: string,
    @Query() query: GetMessagesDto,
  ) {
    const userId = (req as any).user?.sub as string;
    return this.conversationsService.listMessages(tenantContext.effectiveTenantId, userId, conversationId, query);
  }

  @Post(':id/messages')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async sendMessage(
    @TenantContextParam() tenantContext: TenantContext,
    @Req() req: Request,
    @Param('id') conversationId: string,
    @Body() dto: CreateMessageDto,
  ) {
    const userId = (req as any).user?.sub as string;
    return this.conversationsService.sendMessage(tenantContext.effectiveTenantId, userId, conversationId, dto);
  }

  @Post(':id/members')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async addMembers(
    @TenantContextParam() tenantContext: TenantContext,
    @Req() req: Request,
    @Param('id') conversationId: string,
    @Body() dto: AddMembersDto,
  ) {
    const userId = (req as any).user?.sub as string;
    return this.conversationsService.addMembers(tenantContext.effectiveTenantId, userId, conversationId, dto);
  }

  @Delete(':id/members/:userId')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async removeMember(
    @TenantContextParam() tenantContext: TenantContext,
    @Req() req: Request,
    @Param('id') conversationId: string,
    @Param('userId') userIdToRemove: string,
  ) {
    const actorId = (req as any).user?.sub as string;
    return this.conversationsService.removeMember(tenantContext.effectiveTenantId, actorId, conversationId, userIdToRemove);
  }
}
