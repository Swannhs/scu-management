import { ForbiddenException, INestApplication, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { io } from 'socket.io-client';
import { RealtimeGateway } from '../src/social/gateways/realtime.gateway';
import { ConversationsService } from '../src/social/services/conversations.service';
import { CallsService } from '../src/social/services/calls.service';

describe('RealtimeGateway (e2e)', () => {
  let app: INestApplication;
  let baseUrl: string;

  const conversationsService = {
    ensureMember: jest.fn(async (tenantId: string, conversationId: string, userId: string) => {
      if (tenantId === 'tenant-1' && conversationId === 'conv-1' && userId === 'user-1') return true;
      throw new ForbiddenException('Not a conversation member');
    }),
  };

  const callsService = {
    ensureCanJoinRoom: jest.fn(async (tenantId: string, roomId: string, userId: string) => {
      if (tenantId === 'tenant-1' && roomId === 'room-1' && ['user-1', 'user-2'].includes(userId)) return true;
      throw new ForbiddenException('Not allowed to join call room');
    }),
    isActiveParticipant: jest.fn(async (tenantId: string, roomId: string, userId: string) => {
      return tenantId === 'tenant-1' && roomId === 'room-1' && ['user-1', 'user-2'].includes(userId);
    }),
  };

  const configService = {
    get: jest.fn((k: string) => {
      const map: Record<string, string> = {
        KEYCLOAK_AUTH_SERVER_URL: 'http://localhost:8080',
        KEYCLOAK_REALM: 'test',
        KEYCLOAK_CLIENT_ID: 'test-client',
        KEYCLOAK_CLIENT_SECRET: 'test-secret',
      };
      return map[k];
    }),
  };

  @Module({
    providers: [
      RealtimeGateway,
      { provide: ConfigService, useValue: configService },
      { provide: ConversationsService, useValue: conversationsService },
      { provide: CallsService, useValue: callsService },
    ],
  })
  class WsTestModule {}

  const token = (sub: string, tenantId: string) =>
    `test.${Buffer.from(JSON.stringify({ sub, tenant_id: tenantId, realm_access: { roles: ['STUDENT'] } })).toString('base64url')}`;

  beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    const mod = await Test.createTestingModule({ imports: [WsTestModule] }).compile();
    app = mod.createNestApplication();
    await app.listen(0);
    const address = app.getHttpServer().address();
    baseUrl = `http://127.0.0.1:${address.port}`;
  });

  afterAll(async () => {
    await app.close();
  });

  it('connects and join_conversation succeeds for a member', async () => {
    const socket = io(`${baseUrl}/ws`, {
      transports: ['websocket'],
      extraHeaders: {
        Authorization: `Bearer ${token('user-1', 'tenant-1')}`,
        'X-Tenant-ID': 'tenant-1',
      },
    });

    await new Promise((resolve) => socket.on('connect', resolve));
    const result = await socket.emitWithAck('join_conversation', { conversationId: 'conv-1' });
    expect(result.joined).toBe(true);
    socket.disconnect();
  });

  it('non-member join_conversation fails', async () => {
    const socket = io(`${baseUrl}/ws`, {
      transports: ['websocket'],
      extraHeaders: {
        Authorization: `Bearer ${token('user-9', 'tenant-1')}`,
        'X-Tenant-ID': 'tenant-1',
      },
    });

    await new Promise((resolve) => socket.on('connect', resolve));
    await expect(socket.emitWithAck('join_conversation', { conversationId: 'conv-1' })).rejects.toBeDefined();
    socket.disconnect();
  });

  it('call_offer routes only to intended user when both joined', async () => {
    const u1 = io(`${baseUrl}/ws`, {
      transports: ['websocket'],
      extraHeaders: {
        Authorization: `Bearer ${token('user-1', 'tenant-1')}`,
        'X-Tenant-ID': 'tenant-1',
      },
    });
    const u2 = io(`${baseUrl}/ws`, {
      transports: ['websocket'],
      extraHeaders: {
        Authorization: `Bearer ${token('user-2', 'tenant-1')}`,
        'X-Tenant-ID': 'tenant-1',
      },
    });

    await Promise.all([
      new Promise((resolve) => u1.on('connect', resolve)),
      new Promise((resolve) => u2.on('connect', resolve)),
    ]);

    await u1.emitWithAck('call_join', { roomId: 'room-1' });
    await u2.emitWithAck('call_join', { roomId: 'room-1' });

    const received = new Promise((resolve) => u2.once('call_offer', resolve));
    await u1.emitWithAck('call_offer', { roomId: 'room-1', toUserId: 'user-2', sdp: 'abc' });

    const payload: any = await received;
    expect(payload.fromUserId).toBe('user-1');
    expect(payload.toUserId).toBe('user-2');

    u1.disconnect();
    u2.disconnect();
  });
});
