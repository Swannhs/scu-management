import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { AuthenticatedUser, Roles } from 'nest-keycloak-connect';
import { TenantContextParam } from '../../common/tenant-context.decorator';
import { TenantContext } from '../../common/tenant-context';
import { CreateDirectConversationDto } from '../dto/create-direct-conversation.dto';
import { CreateGroupConversationDto } from '../dto/create-group-conversation.dto';
import { CreateMessageDto } from '../dto/create-message.dto';
import { AddMembersDto } from '../dto/add-members.dto';
import { GetMessagesDto } from '../dto/get-messages.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';
import { KeycloakUser } from '../../common/keycloak-user.interface';
import { ConversationsService } from '../services/conversations.service';
import { UpdateMessageDto } from '../dto/update-message.dto';
import { ReadConversationDto } from '../dto/read-conversation.dto';
import { Request } from 'express';

@Controller('v1/conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Post('direct')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async createDirect(@TenantContextParam() tenantContext: TenantContext, @AuthenticatedUser() user: KeycloakUser, @Body() dto: CreateDirectConversationDto) {
    return this.conversationsService.createDirectConversation(tenantContext.effectiveTenantId, user.sub, dto);
  }

  @Post('group')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async createGroup(@TenantContextParam() tenantContext: TenantContext, @AuthenticatedUser() user: KeycloakUser, @Body() dto: CreateGroupConversationDto) {
    return this.conversationsService.createGroupConversation(tenantContext.effectiveTenantId, user.sub, dto);
  }

  @Patch(':id')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async updateGroup(@TenantContextParam() tenantContext: TenantContext, @AuthenticatedUser() user: KeycloakUser, @Param('id') conversationId: string, @Body() dto: UpdateGroupDto) {
    return this.conversationsService.updateGroup(tenantContext.effectiveTenantId, user.sub, conversationId, dto);
  }

  @Get()
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async listConversations(@TenantContextParam() tenantContext: TenantContext, @AuthenticatedUser() user: KeycloakUser) {
    return this.conversationsService.listConversations(tenantContext.effectiveTenantId, user.sub);
  }

  @Get(':id/messages')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async listMessages(@TenantContextParam() tenantContext: TenantContext, @AuthenticatedUser() user: KeycloakUser, @Param('id') conversationId: string, @Query() query: GetMessagesDto) {
    return this.conversationsService.listMessages(tenantContext.effectiveTenantId, user.sub, conversationId, query);
  }

  @Post(':id/messages')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async sendMessage(@TenantContextParam() tenantContext: TenantContext, @AuthenticatedUser() user: KeycloakUser, @Param('id') conversationId: string, @Body() dto: CreateMessageDto) {
    return this.conversationsService.sendMessage(tenantContext.effectiveTenantId, user.sub, conversationId, dto);
  }

  @Patch(':id/messages/:messageId')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async editMessage(@TenantContextParam() tenantContext: TenantContext, @AuthenticatedUser() user: KeycloakUser, @Param('id') conversationId: string, @Param('messageId') messageId: string, @Body() dto: UpdateMessageDto) {
    return this.conversationsService.editMessage(tenantContext.effectiveTenantId, user.sub, conversationId, messageId, dto.text);
  }

  @Delete(':id/messages/:messageId')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async deleteMessage(@TenantContextParam() tenantContext: TenantContext, @Req() req: Request, @Param('id') conversationId: string, @Param('messageId') messageId: string) {
    return this.conversationsService.deleteMessage(tenantContext.effectiveTenantId, req.user?.sub as string, conversationId, messageId, req.user?.realm_access?.roles ?? []);
  }

  @Post(':id/read')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async markRead(@TenantContextParam() tenantContext: TenantContext, @AuthenticatedUser() user: KeycloakUser, @Param('id') conversationId: string, @Body() dto: ReadConversationDto) {
    return this.conversationsService.markRead(tenantContext.effectiveTenantId, user.sub, conversationId, dto);
  }

  @Get(':id/read-state')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async readState(@TenantContextParam() tenantContext: TenantContext, @Param('id') conversationId: string) {
    return this.conversationsService.getReadState(tenantContext.effectiveTenantId, conversationId);
  }

  @Post(':id/members')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async addMembers(@TenantContextParam() tenantContext: TenantContext, @AuthenticatedUser() user: KeycloakUser, @Param('id') conversationId: string, @Body() dto: AddMembersDto) {
    return this.conversationsService.addMembers(tenantContext.effectiveTenantId, user.sub, conversationId, dto);
  }

  @Delete(':id/members/:userId')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async removeMember(@TenantContextParam() tenantContext: TenantContext, @AuthenticatedUser() user: KeycloakUser, @Param('id') conversationId: string, @Param('userId') userIdToRemove: string) {
    return this.conversationsService.removeMember(tenantContext.effectiveTenantId, user.sub, conversationId, userIdToRemove);
  }
}
