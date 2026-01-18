import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { AuthenticatedUser, Roles } from 'nest-keycloak-connect';
import { TenantContextParam } from '../../common/tenant-context.decorator';
import { TenantContext } from '../../common/tenant-context';
import { CreateDirectConversationDto } from '../dto/create-direct-conversation.dto';
import { CreateGroupConversationDto } from '../dto/create-group-conversation.dto';
import { CreateMessageDto } from '../dto/create-message.dto';
import { AddMembersDto } from '../dto/add-members.dto';
import { GetMessagesDto } from '../dto/get-messages.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';
import { ConversationsService } from '../services/conversations.service';
import { KeycloakUser } from '../../common/keycloak-user.interface';

@Controller('v1/conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Post('direct')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async createDirect(
    @TenantContextParam() tenantContext: TenantContext,
    @AuthenticatedUser() user: KeycloakUser,
    @Body() dto: CreateDirectConversationDto,
  ) {
    return this.conversationsService.createDirectConversation(tenantContext.effectiveTenantId, user.sub, dto);
  }

  @Post('group')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async createGroup(
    @TenantContextParam() tenantContext: TenantContext,
    @AuthenticatedUser() user: KeycloakUser,
    @Body() dto: CreateGroupConversationDto,
  ) {
    return this.conversationsService.createGroupConversation(tenantContext.effectiveTenantId, user.sub, dto);
  }

  @Patch(':id')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async updateGroup(
    @TenantContextParam() tenantContext: TenantContext,
    @AuthenticatedUser() user: KeycloakUser,
    @Param('id') conversationId: string,
    @Body() dto: UpdateGroupDto,
  ) {
    return this.conversationsService.updateGroup(tenantContext.effectiveTenantId, user.sub, conversationId, dto);
  }

  @Get()
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async listConversations(
    @TenantContextParam() tenantContext: TenantContext,
    @AuthenticatedUser() user: KeycloakUser,
  ) {
    return this.conversationsService.listConversations(tenantContext.effectiveTenantId, user.sub);
  }

  @Get(':id/messages')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async listMessages(
    @TenantContextParam() tenantContext: TenantContext,
    @AuthenticatedUser() user: KeycloakUser,
    @Param('id') conversationId: string,
    @Query() query: GetMessagesDto,
  ) {
    return this.conversationsService.listMessages(tenantContext.effectiveTenantId, user.sub, conversationId, query);
  }

  @Post(':id/messages')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async sendMessage(
    @TenantContextParam() tenantContext: TenantContext,
    @AuthenticatedUser() user: KeycloakUser,
    @Param('id') conversationId: string,
    @Body() dto: CreateMessageDto,
  ) {
    return this.conversationsService.sendMessage(tenantContext.effectiveTenantId, user.sub, conversationId, dto);
  }

  @Post(':id/members')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async addMembers(
    @TenantContextParam() tenantContext: TenantContext,
    @AuthenticatedUser() user: KeycloakUser,
    @Param('id') conversationId: string,
    @Body() dto: AddMembersDto,
  ) {
    return this.conversationsService.addMembers(tenantContext.effectiveTenantId, user.sub, conversationId, dto);
  }

  @Delete(':id/members/:userId')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async removeMember(
    @TenantContextParam() tenantContext: TenantContext,
    @AuthenticatedUser() user: KeycloakUser,
    @Param('id') conversationId: string,
    @Param('userId') userIdToRemove: string,
  ) {
    return this.conversationsService.removeMember(tenantContext.effectiveTenantId, user.sub, conversationId, userIdToRemove);
  }
}
