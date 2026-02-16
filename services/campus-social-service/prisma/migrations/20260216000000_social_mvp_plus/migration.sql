-- MVP+ social extensions
CREATE TYPE "GroupMemberStatus" AS ENUM ('ACTIVE', 'PENDING');

ALTER TABLE "group_members" ADD COLUMN IF NOT EXISTS "status" "GroupMemberStatus" NOT NULL DEFAULT 'ACTIVE';
ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "deleted_at" TIMESTAMP;
ALTER TABLE "comments" ADD COLUMN IF NOT EXISTS "deleted_at" TIMESTAMP;
ALTER TABLE "messages" ADD COLUMN IF NOT EXISTS "edited_at" TIMESTAMP;
ALTER TABLE "messages" ADD COLUMN IF NOT EXISTS "deleted_at" TIMESTAMP;

CREATE TABLE IF NOT EXISTS "blocks" (
  "id" TEXT PRIMARY KEY,
  "tenant_id" TEXT NOT NULL,
  "blocker_user_id" TEXT NOT NULL,
  "blocked_user_id" TEXT NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE UNIQUE INDEX IF NOT EXISTS "blocks_tenant_id_blocker_user_id_blocked_user_id_key" ON "blocks" ("tenant_id", "blocker_user_id", "blocked_user_id");

CREATE TABLE IF NOT EXISTS "group_invites" (
  "id" TEXT PRIMARY KEY,
  "tenant_id" TEXT NOT NULL,
  "group_id" TEXT NOT NULL,
  "user_id" TEXT NOT NULL,
  "inviter_id" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'PENDING',
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "reports" (
  "id" TEXT PRIMARY KEY,
  "tenant_id" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "target_id" TEXT NOT NULL,
  "reporter_id" TEXT NOT NULL,
  "reason" TEXT NOT NULL,
  "details" TEXT,
  "status" TEXT NOT NULL DEFAULT 'open',
  "action_taken" TEXT,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "closed_at" TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "conversation_reads" (
  "id" TEXT PRIMARY KEY,
  "tenant_id" TEXT NOT NULL,
  "conversation_id" TEXT NOT NULL,
  "user_id" TEXT NOT NULL,
  "last_read_message_id" TEXT,
  "last_read_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE UNIQUE INDEX IF NOT EXISTS "conversation_reads_tenant_id_conversation_id_user_id_key" ON "conversation_reads" ("tenant_id", "conversation_id", "user_id");

CREATE TABLE IF NOT EXISTS "message_attachments" (
  "id" TEXT PRIMARY KEY,
  "tenant_id" TEXT NOT NULL,
  "message_id" TEXT NOT NULL,
  "url" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "call_participants" (
  "id" TEXT PRIMARY KEY,
  "tenant_id" TEXT NOT NULL,
  "room_id" TEXT NOT NULL,
  "user_id" TEXT NOT NULL,
  "joined_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "left_at" TIMESTAMP
);
CREATE UNIQUE INDEX IF NOT EXISTS "call_participants_tenant_id_room_id_user_id_key" ON "call_participants" ("tenant_id", "room_id", "user_id");
