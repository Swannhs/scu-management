# Campus Social Service

Production-grade social + communication service for campus tenants. This service owns profiles, friendships, groups, posts, comments, reactions, messaging, call signaling, notifications, and the event outbox.

## Scope

- **Tenant safety**: every write/read is scoped by `tenant_id` derived from `X-Tenant-ID` header and the Keycloak token `tenant_id` claim.
- **Keycloak** only: no local auth.
- **Media** is stored in document-service; this service only stores `file_id` references.
- **Outbox** is used for all social event publication.

## Environment

```
DATABASE_URL=postgresql://.../campus_social
KEYCLOAK_AUTH_SERVER_URL=https://...
KEYCLOAK_REALM=scu
KEYCLOAK_CLIENT_ID=campus-social-service
KEYCLOAK_CLIENT_SECRET=...
PORT=3000
```

## Database (Prisma)

Schema is in `prisma/schema.prisma`. All tables include `tenant_id` plus tenant-scoped indexes.

## API Summary

```
GET  /v1/profiles/me
PUT  /v1/profiles/me
GET  /v1/profiles/:userId

POST /v1/friends/requests
POST /v1/friends/requests/:id/accept
POST /v1/friends/requests/:id/reject
GET  /v1/friends

GET  /v1/groups
POST /v1/groups
POST /v1/groups/:id/join
POST /v1/groups/:id/leave
GET  /v1/groups/:id/posts

POST /v1/posts
GET  /v1/feed
POST /v1/posts/:id/comments
POST /v1/posts/:id/react

POST /v1/conversations/direct
GET  /v1/conversations
GET  /v1/conversations/:id/messages
POST /v1/conversations/:id/messages

POST /v1/conversations/:id/calls
POST /v1/calls/:id/join
POST /v1/calls/:id/end

GET  /v1/notifications
POST /v1/notifications/:id/read

POST /v1/events
```

## Event Integration

**Consumes** (via `/v1/events`):
- `student.created` → create default profile
- `student.enrolled` → auto-join course group
- `course.created` → create course group

**Publishes** (via outbox):
- `social.friend_request.sent`
- `social.friend_request.accepted`
- `social.post.created`
- `social.comment.created`
- `social.message.sent`
- `social.call.started`

## Example Requests/Responses

### Create post

Request:
```json
{
  "targetType": "GROUP",
  "targetId": "d2f1b8aa-94f4-4c30-9ef0-1f42a2c94d27",
  "text": "Welcome to the new semester!",
  "mediaFileIds": ["9cfb9e23-203b-4e3f-bc7e-5892b6d44e4d"]
}
```

Response:
```json
{
  "id": "1f3b4b2f-2351-4f0c-8b1b-7bfe2c92e7a2",
  "tenantId": "tenant-01",
  "authorId": "user-123",
  "targetType": "GROUP",
  "targetId": "d2f1b8aa-94f4-4c30-9ef0-1f42a2c94d27",
  "text": "Welcome to the new semester!",
  "createdAt": "2025-01-12T09:30:00.000Z",
  "updatedAt": "2025-01-12T09:30:00.000Z"
}
```

### Start a call

Request:
```json
{
  "callType": "VIDEO",
  "providerRoomId": "daily-room-9a23"
}
```

Response:
```json
{
  "id": "9fd982b0-55f7-4d7f-9d8c-971d1e9b2cf0",
  "tenantId": "tenant-01",
  "conversationId": "d93d7cb0-94bf-4bb7-a30b-0a8a5b6c3877",
  "createdBy": "user-123",
  "callType": "VIDEO",
  "providerRoomId": "daily-room-9a23",
  "status": "ACTIVE",
  "createdAt": "2025-01-12T10:00:00.000Z",
  "endedAt": null
}
```

## Test Checklist

- Tenant isolation: `X-Tenant-ID` matches token `tenant_id`, mismatch → 403 `TENANT_CONTEXT_MISMATCH`.
- Role enforcement: STUDENT, FACULTY, TENANT_ADMIN only for endpoints.
- CLUB group creation restricted to STUDENT.
- Outbox events written for friend requests, posts, comments, messages, and calls.
- Conversation membership enforced for messages and calls.
- Course group created from `course.created` and auto-joined on `student.enrolled`.

## Tenant-aware API and docs

### Security and tenant enforcement
- Required header: `X-Tenant-ID`
- Required token claim: `tenant_id`
- Mismatch (unless global admin role): `403`
- Standardized response envelope enabled globally for success and errors.

### Unified docs endpoints
- `GET /openapi.json`
- `GET /api-docs`

### MVP social routes
- Profiles: `/v1/profiles/*`
- Friends: `/v1/friends/*`
- Groups: `/v1/groups/*`
- Chats: `/v1/chats/*`
- Posts: `/v1/posts/*`
- Notifications: `/v1/notifications/*`
- Calls skeleton: `/v1/calls/rooms/*`

## MVP+ additions (Students + Faculty + Tenant Admin)

### Group workflows
- Private/secret join requests now create `PENDING` membership.
- Moderation endpoints:
  - `GET /v1/groups/:id/requests`
  - `POST /v1/groups/:id/requests/:userId/approve`
  - `POST /v1/groups/:id/requests/:userId/reject`
- Invitations:
  - `POST /v1/groups/:id/invite`
  - `GET /v1/groups/:id/invites`
  - `POST /v1/groups/:id/invites/:inviteId/accept`
  - `POST /v1/groups/:id/invites/:inviteId/reject`
- Group create policy: `STUDENT`, `FACULTY`, `TENANT_ADMIN`.

### Posts & moderation
- Added post/detail/comment pagination APIs and moderation/reporting:
  - `GET /v1/posts/:id`
  - `GET /v1/posts/:id/comments?cursor=&limit=`
  - `PATCH /v1/posts/:id`, `DELETE /v1/posts/:id` (soft delete)
  - `PATCH /v1/comments/:id`, `DELETE /v1/comments/:id`
  - `POST /v1/reports`
  - `GET /v1/moderation/reports?status=`
  - `POST /v1/moderation/reports/:id/close`
- Media stub:
  - `POST /v1/media/upload` (base64 payload -> local file URL)

### Friends
- Block system:
  - `POST /v1/friends/block`
  - `POST /v1/friends/unblock`
  - `GET /v1/friends/blocked`
- Mutual friends:
  - `GET /v1/friends/:userId/mutual`
- Blocked users cannot send friend requests or start DMs.

### Conversations / chat
- Message edit/delete:
  - `PATCH /v1/conversations/:id/messages/:messageId`
  - `DELETE /v1/conversations/:id/messages/:messageId`
- Read receipts:
  - `POST /v1/conversations/:id/read`
  - `GET /v1/conversations/:id/read-state`
- Message attachments accepted in send-message DTO.

### Calls
- Added room participant tracking and invite notifications:
  - `GET /v1/calls/rooms/:roomId/participants`
  - `POST /v1/calls/rooms/:roomId/invite`

### Notifications
- Cursor pagination + unread count:
  - `GET /v1/notifications?cursor=&limit=&unread=`
  - `GET /v1/notifications/unread-count`

### Directory search
- `GET /v1/directory/users?query=`

### Event ingest hardening
- `POST /v1/events` now supports optional shared secret header `X-Social-Event-Secret` via `SOCIAL_EVENT_INGEST_SECRET`.

### OpenAPI / docs endpoints
- `GET /openapi.json`
- `GET /api-docs-json`
- `GET /api-docs`

### WebSocket usage
- WebSocket gateway is not introduced in this patch; HTTP APIs include read receipts and call participant/invite primitives for UI integration.


## Realtime WebSocket (/ws)

Connection URL:
- `ws://<host>/ws`

Auth during handshake (either style):
1) Headers (preferred)
   - `Authorization: Bearer <token>`
   - `X-Tenant-ID: <tenant-id>`
2) Query fallback
   - `token=<bearer-token-without-prefix>`
   - `tenantId=<tenant-id>`

Tenant enforcement:
- handshake tenant must match token `tenant_id` unless global admin.
- socket joins personal room `user:{userId}` automatically.

Rooms:
- conversation room: `conv:{conversationId}`
- call room: `call:{roomId}`

Client -> Server events:
- `join_conversation { conversationId }`
- `leave_conversation { conversationId }`
- `typing { conversationId, isTyping }`
- `call_join { roomId }`
- `call_leave { roomId }`
- `call_offer { roomId, toUserId, sdp }`
- `call_answer { roomId, toUserId, sdp }`
- `call_ice { roomId, toUserId, candidate }`

Server -> Client events:
- `message_created { conversationId, message }`
- `typing { conversationId, userId, isTyping }`
- `call_participant_joined { userId }`
- `call_offer`, `call_answer`, `call_ice` (routed to `user:{toUserId}` only when both users are active in same tenant/call room)
