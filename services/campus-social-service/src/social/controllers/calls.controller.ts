import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { Roles } from 'nest-keycloak-connect';
import { Request } from 'express';
import { TenantContextParam } from '../../common/tenant-context.decorator';
import type { TenantContext } from '../../common/tenant-context';
import { CreateCallDto } from '../dto/create-call.dto';
import { CreateCallRoomDto } from '../dto/create-call-room.dto';
import { InviteCallParticipantsDto } from '../dto/invite-call-participants.dto';
import { CallsService } from '../services/calls.service';

@Controller('v1')
export class CallsController {
  constructor(private readonly callsService: CallsService) {}

  @Post('conversations/:id/calls')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async startCall(@TenantContextParam() tenantContext: TenantContext, @Req() req: Request, @Param('id') conversationId: string, @Body() dto: CreateCallDto) {
    return this.callsService.startCall(tenantContext.effectiveTenantId, req.user?.sub as string, conversationId, dto);
  }

  @Post('calls/rooms')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async createCallRoom(@TenantContextParam() tenantContext: TenantContext, @Req() req: Request, @Body() dto: CreateCallRoomDto) {
    return this.callsService.createRoom(tenantContext.effectiveTenantId, req.user?.sub as string, dto.type, dto.targetId);
  }

  @Post('calls/rooms/:roomId/join')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async joinRoom(@TenantContextParam() tenantContext: TenantContext, @Req() req: Request, @Param('roomId') roomId: string) {
    return this.callsService.joinRoom(tenantContext.effectiveTenantId, req.user?.sub as string, roomId);
  }

  @Post('calls/rooms/:roomId/leave')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async leaveRoom(@TenantContextParam() tenantContext: TenantContext, @Req() req: Request, @Param('roomId') roomId: string) {
    return this.callsService.leaveRoom(tenantContext.effectiveTenantId, req.user?.sub as string, roomId);
  }

  @Get('calls/rooms/:roomId/participants')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async participants(@TenantContextParam() tenantContext: TenantContext, @Param('roomId') roomId: string) {
    return this.callsService.participants(tenantContext.effectiveTenantId, roomId);
  }

  @Post('calls/rooms/:roomId/invite')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async invite(@TenantContextParam() tenantContext: TenantContext, @Req() req: Request, @Param('roomId') roomId: string, @Body() dto: InviteCallParticipantsDto) {
    return this.callsService.invite(tenantContext.effectiveTenantId, roomId, req.user?.sub as string, dto.userIds);
  }

  @Post('calls/:id/join')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async joinCall(@TenantContextParam() tenantContext: TenantContext, @Req() req: Request, @Param('id') callId: string) {
    return this.callsService.joinCall(tenantContext.effectiveTenantId, req.user?.sub as string, callId);
  }

  @Post('calls/:id/end')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async endCall(@TenantContextParam() tenantContext: TenantContext, @Req() req: Request, @Param('id') callId: string) {
    return this.callsService.endCall(tenantContext.effectiveTenantId, req.user?.sub as string, callId);
  }
}
