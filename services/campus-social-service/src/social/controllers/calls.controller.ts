import { Body, Controller, Param, Post, Req } from '@nestjs/common';
import { Roles } from 'nest-keycloak-connect';
import { Request } from 'express';
import { TenantContextParam } from '../../common/tenant-context.decorator';
import { TenantContext } from '../../common/tenant-context';
import { CreateCallDto } from '../dto/create-call.dto';
import { CreateCallRoomDto } from '../dto/create-call-room.dto';
import { CallsService } from '../services/calls.service';

@Controller('v1')
export class CallsController {
  constructor(private readonly callsService: CallsService) {}

  @Post('conversations/:id/calls')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async startCall(
    @TenantContextParam() tenantContext: TenantContext,
    @Req() req: Request,
    @Param('id') conversationId: string,
    @Body() dto: CreateCallDto,
  ) {
    const userId = req.user?.sub as string;
    return this.callsService.startCall(tenantContext.effectiveTenantId, userId, conversationId, dto);
  }

  @Post('calls/rooms')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async createCallRoom(
    @TenantContextParam() tenantContext: TenantContext,
    @Req() req: Request,
    @Body() dto: CreateCallRoomDto,
  ) {
    const userId = req.user?.sub as string;
    return this.callsService.createRoom(tenantContext.effectiveTenantId, userId, dto.type, dto.targetId);
  }

  @Post('calls/rooms/:roomId/join')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async joinRoom(
    @TenantContextParam() tenantContext: TenantContext,
    @Req() req: Request,
    @Param('roomId') roomId: string,
  ) {
    const userId = req.user?.sub as string;
    return this.callsService.joinRoom(tenantContext.effectiveTenantId, userId, roomId);
  }

  @Post('calls/rooms/:roomId/leave')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async leaveRoom(
    @TenantContextParam() tenantContext: TenantContext,
    @Req() req: Request,
    @Param('roomId') roomId: string,
  ) {
    const userId = req.user?.sub as string;
    return this.callsService.leaveRoom(tenantContext.effectiveTenantId, userId, roomId);
  }

  @Post('calls/:id/join')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async joinCall(
    @TenantContextParam() tenantContext: TenantContext,
    @Req() req: Request,
    @Param('id') callId: string,
  ) {
    const userId = req.user?.sub as string;
    return this.callsService.joinCall(tenantContext.effectiveTenantId, userId, callId);
  }

  @Post('calls/:id/end')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async endCall(
    @TenantContextParam() tenantContext: TenantContext,
    @Req() req: Request,
    @Param('id') callId: string,
  ) {
    const userId = req.user?.sub as string;
    return this.callsService.endCall(tenantContext.effectiveTenantId, userId, callId);
  }
}
