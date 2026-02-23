import { BadRequestException, CanActivate, ExecutionContext, INestApplication, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { TenantAuthGuard } from '../src/common/guards/tenant-auth.guard';
import { CallsController } from '../src/social/controllers/calls.controller';
import { ConversationsController } from '../src/social/controllers/conversations.controller';
import { FriendsController } from '../src/social/controllers/friends.controller';
import { GroupsController } from '../src/social/controllers/groups.controller';
import { PostsController } from '../src/social/controllers/posts.controller';
import { ProfilesController } from '../src/social/controllers/profiles.controller';
import { CallsService } from '../src/social/services/calls.service';
import { ConversationsService } from '../src/social/services/conversations.service';
import { FriendsService } from '../src/social/services/friends.service';
import { GroupsService } from '../src/social/services/groups.service';
import { PostsService } from '../src/social/services/posts.service';
import { ProfilesService } from '../src/social/services/profiles.service';

class MockAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const auth = req.headers.authorization as string | undefined;
    if (!auth?.startsWith('Bearer test.')) throw new BadRequestException('Authentication required');
    req.user = JSON.parse(Buffer.from(auth.slice('Bearer test.'.length), 'base64url').toString('utf8'));
    return true;
  }
}

const token = (sub: string, tenantId: string) =>
  `test.${Buffer.from(JSON.stringify({ sub, tenant_id: tenantId, realm_access: { roles: ['STUDENT'] } })).toString('base64url')}`;

describe('Core social flows (e2e)', () => {
  let app: INestApplication;
  const state = { friendRequestId: 'fr-1', groupId: 'g-1', postId: 'p-1', conversationId: 'c-1', roomId: 'room-1' };

  const profiles = {
    upsertMyProfile: jest.fn(async (tenantId: string, userId: string, dto: any) => ({ tenantId, userId, ...dto })),
    getProfile: jest.fn(async (tenantId: string, userId: string) => ({ tenantId, userId, headline: 'hello' })),
  };
  const friends = {
    requestFriend: jest.fn(async () => ({ id: state.friendRequestId })),
    acceptRequest: jest.fn(async () => ({ id: state.friendRequestId, status: 'ACCEPTED' })),
    listFriends: jest.fn(async () => [{ id: 'friend-1' }]),
  };
  const groups = {
    createGroup: jest.fn(async () => ({ id: state.groupId })),
    joinGroup: jest.fn(async () => ({ id: 'm-1', status: 'PENDING' })),
    approveJoinRequest: jest.fn(async () => ({ id: 'm-1', status: 'ACTIVE' })),
    listMembers: jest.fn(async () => [{ userId: 'u1' }, { userId: 'u2' }]),
  };
  const posts = {
    createPost: jest.fn(async () => ({ id: state.postId })),
    addComment: jest.fn(async () => ({ id: 'cm-1' })),
    reactToPost: jest.fn(async () => ({ id: 'r-1', reactionType: 'LIKE' })),
    getPost: jest.fn(async () => ({ id: state.postId })),
  };
  const conv = {
    createDirectConversation: jest.fn(async () => ({ id: state.conversationId })),
    sendMessage: jest.fn(async () => ({ id: 'm-1' })),
    listMessages: jest.fn(async () => [{ id: 'm-1' }]),
  };
  const calls = {
    createRoom: jest.fn(async () => ({ roomId: state.roomId })),
    joinRoom: jest.fn(async () => ({ roomId: state.roomId })),
    participants: jest.fn(async () => [{ userId: 'u1' }]),
  };

  @Module({
    controllers: [ProfilesController, FriendsController, GroupsController, PostsController, ConversationsController, CallsController],
    providers: [
      { provide: ProfilesService, useValue: profiles },
      { provide: FriendsService, useValue: friends },
      { provide: GroupsService, useValue: groups },
      { provide: PostsService, useValue: posts },
      { provide: ConversationsService, useValue: conv },
      { provide: CallsService, useValue: calls },
    ],
  })
  class TModule {}

  beforeAll(async () => {
    const mod = await Test.createTestingModule({
      imports: [TModule],
      providers: [{ provide: APP_GUARD, useClass: MockAuthGuard }, { provide: APP_GUARD, useClass: TenantAuthGuard }],
    }).compile();
    app = mod.createNestApplication();
    await app.init();
  });

  afterAll(async () => app.close());

  it('profile flow: update me -> get me', async () => {
    const auth = `Bearer ${token('u1', 'tenant-1')}`;
    await request(app.getHttpServer()).put('/v1/profiles/me').set('Authorization', auth).set('X-Tenant-ID', 'tenant-1').send({ headline: 'hello' }).expect(200);
    await request(app.getHttpServer()).get('/v1/profiles/me').set('Authorization', auth).set('X-Tenant-ID', 'tenant-1').expect(200);
  });

  it('friends flow: request -> accept -> list', async () => {
    const auth = `Bearer ${token('u1', 'tenant-1')}`;
    await request(app.getHttpServer()).post('/v1/friends/requests').set('Authorization', auth).set('X-Tenant-ID', 'tenant-1').send({ targetUserId: 'u2' }).expect(201);
    await request(app.getHttpServer()).post('/v1/friends/requests/fr-1/accept').set('Authorization', auth).set('X-Tenant-ID', 'tenant-1').expect(201);
    await request(app.getHttpServer()).get('/v1/friends').set('Authorization', auth).set('X-Tenant-ID', 'tenant-1').expect(200);
  });

  it('groups flow: create -> join private -> approve -> members', async () => {
    const auth = `Bearer ${token('u1', 'tenant-1')}`;
    await request(app.getHttpServer()).post('/v1/groups').set('Authorization', auth).set('X-Tenant-ID', 'tenant-1').send({ type: 'CLUB', name: 'Chess', visibility: 'PRIVATE' }).expect(201);
    await request(app.getHttpServer()).post('/v1/groups/g-1/join').set('Authorization', auth).set('X-Tenant-ID', 'tenant-1').expect(201);
    await request(app.getHttpServer()).post('/v1/groups/g-1/requests/u2/approve').set('Authorization', auth).set('X-Tenant-ID', 'tenant-1').expect(201);
    await request(app.getHttpServer()).get('/v1/groups/g-1/members').set('Authorization', auth).set('X-Tenant-ID', 'tenant-1').expect(200);
  });

  it('posts flow: create -> comment -> react -> get', async () => {
    const auth = `Bearer ${token('u1', 'tenant-1')}`;
    await request(app.getHttpServer()).post('/v1/posts').set('Authorization', auth).set('X-Tenant-ID', 'tenant-1').send({ targetType: 'PROFILE', targetId: 'u1', text: 'Hi' }).expect(201);
    await request(app.getHttpServer()).post('/v1/posts/p-1/comments').set('Authorization', auth).set('X-Tenant-ID', 'tenant-1').send({ text: 'Nice' }).expect(201);
    await request(app.getHttpServer()).post('/v1/posts/p-1/react').set('Authorization', auth).set('X-Tenant-ID', 'tenant-1').send({ reactionType: 'LIKE' }).expect(201);
    await request(app.getHttpServer()).get('/v1/posts/p-1').set('Authorization', auth).set('X-Tenant-ID', 'tenant-1').expect(200);
  });

  it('chat flow: create conversation -> send message -> list messages', async () => {
    const auth = `Bearer ${token('u1', 'tenant-1')}`;
    await request(app.getHttpServer()).post('/v1/conversations/direct').set('Authorization', auth).set('X-Tenant-ID', 'tenant-1').send({ recipientId: 'u2' }).expect(201);
    await request(app.getHttpServer()).post('/v1/conversations/c-1/messages').set('Authorization', auth).set('X-Tenant-ID', 'tenant-1').send({ text: 'hello' }).expect(201);
    await request(app.getHttpServer()).get('/v1/conversations/c-1/messages').set('Authorization', auth).set('X-Tenant-ID', 'tenant-1').expect(200);
  });

  it('calls flow: create room -> join -> list participants', async () => {
    const auth = `Bearer ${token('u1', 'tenant-1')}`;
    await request(app.getHttpServer()).post('/v1/calls/rooms').set('Authorization', auth).set('X-Tenant-ID', 'tenant-1').send({ type: 'GROUP', targetId: 'g-1' }).expect(201);
    await request(app.getHttpServer()).post('/v1/calls/rooms/room-1/join').set('Authorization', auth).set('X-Tenant-ID', 'tenant-1').expect(201);
    await request(app.getHttpServer()).get('/v1/calls/rooms/room-1/participants').set('Authorization', auth).set('X-Tenant-ID', 'tenant-1').expect(200);
  });

  it('tenant mismatch returns 403', async () => {
    await request(app.getHttpServer())
      .get('/v1/profiles/me')
      .set('Authorization', `Bearer ${token('u1', 'tenant-1')}`)
      .set('X-Tenant-ID', 'tenant-2')
      .expect(403);
  });
});
