import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ForbiddenException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import type { Server, Socket } from 'socket.io';
import { ConfigService } from '@nestjs/config';
import { ConversationsService } from '../services/conversations.service';
import { CallsService } from '../services/calls.service';

interface SocketIdentity {
  userId: string;
  tenantId: string;
  roles: string[];
}

@Injectable()
@WebSocketGateway({ namespace: '/ws', transports: ['websocket'] })
export class RealtimeGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(RealtimeGateway.name);
  private readonly keycloak: any;
  private static activeGateway?: RealtimeGateway;

  @WebSocketServer()
  server!: Server;

  constructor(
    private readonly config: ConfigService,
    private readonly conversationsService: ConversationsService,
    private readonly callsService: CallsService,
  ) {
    RealtimeGateway.activeGateway = this;
    // keep WS auth aligned with Keycloak-based HTTP auth config
    const Keycloak = require('keycloak-connect');
    this.keycloak = new Keycloak({}, {
      authServerUrl: this.config.get<string>('KEYCLOAK_AUTH_SERVER_URL'),
      realm: this.config.get<string>('KEYCLOAK_REALM'),
      clientId: this.config.get<string>('KEYCLOAK_CLIENT_ID'),
      secret: this.config.get<string>('KEYCLOAK_CLIENT_SECRET'),
    });
  }

  async handleConnection(client: Socket) {
    try {
      const identity = await this.authenticate(client);
      client.data = identity;
      client.join(this.userRoom(identity.userId));
    } catch (error) {
      this.logger.warn(`WS auth failed: ${(error as Error).message}`);
      client.emit('error', { message: 'Unauthorized' });
      client.disconnect(true);
    }
  }

  handleDisconnect(_client: Socket) {}

  emitMessageCreated(conversationId: string, message: unknown) {
    this.server.to(this.conversationRoom(conversationId)).emit('message_created', {
      conversationId,
      message,
    });
  }

  static notifyMessageCreated(conversationId: string, message: unknown) {
    RealtimeGateway.activeGateway?.emitMessageCreated(conversationId, message);
  }

  private async authenticate(client: Socket): Promise<SocketIdentity> {
    const headers = client.handshake.headers ?? {};
    const q = client.handshake.query ?? {};

    const authHeader = (headers.authorization as string | undefined) ??
      (typeof q.token === 'string' ? `Bearer ${q.token}` : undefined);

    const tenantId =
      (headers['x-tenant-id'] as string | undefined)?.trim() ??
      (typeof q.tenantId === 'string' ? q.tenantId.trim() : undefined);

    if (!authHeader?.startsWith('Bearer ')) throw new UnauthorizedException('Missing bearer token');
    if (!tenantId) throw new UnauthorizedException('Missing tenant id');

    const payload = await this.verifyToken(authHeader.slice(7));
    const tokenTenant = payload.tenant_id as string | undefined;
    const userId = (payload.sub as string | undefined) ?? (payload.userId as string | undefined);

    if (!tokenTenant || !userId) throw new UnauthorizedException('Invalid token payload');

    const roles = this.extractRoles(payload);
    const isGlobalAdmin = roles.includes('admin') || roles.includes('GLOBAL_ADMIN');
    if (!isGlobalAdmin && tenantId !== tokenTenant) throw new ForbiddenException('Tenant mismatch');

    return { userId, tenantId: tokenTenant, roles };
  }

  private async verifyToken(token: string): Promise<Record<string, unknown>> {
    if (process.env.NODE_ENV === 'test' && token.startsWith('test.')) {
      const encoded = token.slice('test.'.length);
      return JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8'));
    }

    try {
      const grant = await this.keycloak.grantManager.createGrant(JSON.stringify({ access_token: token }));
      const content = grant?.access_token?.content;
      if (!content) throw new Error('Invalid token');
      return content as Record<string, unknown>;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractRoles(payload: Record<string, unknown>): string[] {
    const realmRoles = ((payload.realm_access as any)?.roles ?? []) as string[];
    const resourceRoles = Object.values((payload.resource_access as Record<string, any>) ?? {}).flatMap(
      (resource) => (resource?.roles ?? []) as string[],
    );
    return [...new Set([...realmRoles, ...resourceRoles])];
  }

  private userRoom(userId: string) {
    return `user:${userId}`;
  }

  private conversationRoom(conversationId: string) {
    return `conv:${conversationId}`;
  }

  private callRoom(roomId: string) {
    return `call:${roomId}`;
  }

  @SubscribeMessage('join_conversation')
  async joinConversation(@ConnectedSocket() client: Socket, @MessageBody() body: { conversationId: string }) {
    const identity = client.data as SocketIdentity;
    await this.conversationsService.ensureMember(identity.tenantId, body.conversationId, identity.userId);
    await client.join(this.conversationRoom(body.conversationId));
    return { joined: true };
  }

  @SubscribeMessage('leave_conversation')
  async leaveConversation(@ConnectedSocket() client: Socket, @MessageBody() body: { conversationId: string }) {
    await client.leave(this.conversationRoom(body.conversationId));
    return { left: true };
  }

  @SubscribeMessage('typing')
  async typing(@ConnectedSocket() client: Socket, @MessageBody() body: { conversationId: string; isTyping: boolean }) {
    const identity = client.data as SocketIdentity;
    const room = this.conversationRoom(body.conversationId);
    client.to(room).emit('typing', {
      conversationId: body.conversationId,
      userId: identity.userId,
      isTyping: body.isTyping,
    });
    return { ok: true };
  }

  @SubscribeMessage('call_join')
  async callJoin(@ConnectedSocket() client: Socket, @MessageBody() body: { roomId: string }) {
    const identity = client.data as SocketIdentity;
    await this.callsService.ensureCanJoinRoom(identity.tenantId, body.roomId, identity.userId);
    const room = this.callRoom(body.roomId);
    await client.join(room);
    client.to(room).emit('call_participant_joined', { userId: identity.userId });
    return { joined: true };
  }

  @SubscribeMessage('call_leave')
  async callLeave(@ConnectedSocket() client: Socket, @MessageBody() body: { roomId: string }) {
    await client.leave(this.callRoom(body.roomId));
    return { left: true };
  }

  @SubscribeMessage('call_offer')
  async callOffer(@ConnectedSocket() client: Socket, @MessageBody() body: { roomId: string; toUserId: string; sdp: string }) {
    return this.routeCallSignal(client, 'call_offer', body);
  }

  @SubscribeMessage('call_answer')
  async callAnswer(@ConnectedSocket() client: Socket, @MessageBody() body: { roomId: string; toUserId: string; sdp: string }) {
    return this.routeCallSignal(client, 'call_answer', body);
  }

  @SubscribeMessage('call_ice')
  async callIce(@ConnectedSocket() client: Socket, @MessageBody() body: { roomId: string; toUserId: string; candidate: unknown }) {
    return this.routeCallSignal(client, 'call_ice', body);
  }

  private async routeCallSignal(
    client: Socket,
    eventName: 'call_offer' | 'call_answer' | 'call_ice',
    body: { roomId: string; toUserId: string; [k: string]: unknown },
  ) {
    const identity = client.data as SocketIdentity;
    const [fromAllowed, toAllowed] = await Promise.all([
      this.callsService.isActiveParticipant(identity.tenantId, body.roomId, identity.userId),
      this.callsService.isActiveParticipant(identity.tenantId, body.roomId, body.toUserId),
    ]);

    if (!fromAllowed || !toAllowed) {
      throw new ForbiddenException('Both users must be active participants of the room');
    }

    this.server.to(this.userRoom(body.toUserId)).emit(eventName, {
      roomId: body.roomId,
      fromUserId: identity.userId,
      ...body,
    });

    return { routed: true };
  }
}
