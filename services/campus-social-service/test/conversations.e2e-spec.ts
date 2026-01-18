import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { ConversationsController } from '../src/social/controllers/conversations.controller';
import { ConversationsService } from '../src/social/services/conversations.service';
import { APP_GUARD } from '@nestjs/core';

// Mock Guards to bypass Keycloak
const mockAuthGuard = {
  canActivate: jest.fn((context) => {
    const req = context.switchToHttp().getRequest();
    req.user = { sub: 'user1', tenant_id: 'tenant1', realm_access: { roles: ['STUDENT'] } };
    return true;
  }),
};

// We don't necessarily need RoleGuard if we don't bind it,
// unless the controller fails if Roles metadata is present but no guard handles it?
// Usually safe.

describe('ConversationsController (e2e)', () => {
  let app: INestApplication;
  let service: ConversationsService;

  const mockService = {
    createDirectConversation: jest.fn(),
    createGroupConversation: jest.fn(),
    addMembers: jest.fn(),
    removeMember: jest.fn(),
    listMessages: jest.fn(),
    listConversations: jest.fn(),
    sendMessage: jest.fn(),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [ConversationsController],
      providers: [
        { provide: ConversationsService, useValue: mockService },
        { provide: APP_GUARD, useValue: mockAuthGuard },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  it('/v1/conversations/group (POST)', () => {
    return request(app.getHttpServer())
      .post('/v1/conversations/group')
      .set('X-Tenant-ID', 'tenant1')
      .send({ recipientIds: ['d037000d-5b32-4757-9626-d50d771b953d', 'd037000d-5b32-4757-9626-d50d771b953e'], name: 'Group 1' })
      .expect(201)
      .then(() => {
        expect(mockService.createGroupConversation).toHaveBeenCalled();
      });
  });

  it('/v1/conversations/:id/members (POST)', () => {
    return request(app.getHttpServer())
      .post('/v1/conversations/conv1/members')
      .set('X-Tenant-ID', 'tenant1')
      .send({ userIds: ['d037000d-5b32-4757-9626-d50d771b953f'] })
      .expect(201)
      .then(() => {
        expect(mockService.addMembers).toHaveBeenCalled();
      });
  });

  it('/v1/conversations/group (POST) validation fail', () => {
      return request(app.getHttpServer())
      .post('/v1/conversations/group')
      .set('X-Tenant-ID', 'tenant1')
      .send({ recipientIds: 'not-array' })
      .expect(400);
  });
});
