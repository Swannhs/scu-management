import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ProfilesController } from './controllers/profiles.controller';
import { FriendsController } from './controllers/friends.controller';
import { GroupsController } from './controllers/groups.controller';
import { PostsController } from './controllers/posts.controller';
import { ConversationsController } from './controllers/conversations.controller';
import { ChatsController } from './controllers/chats.controller';
import { CallsController } from './controllers/calls.controller';
import { NotificationsController } from './controllers/notifications.controller';
import { EventsController } from './controllers/events.controller';
import { ProfilesService } from './services/profiles.service';
import { FriendsService } from './services/friends.service';
import { GroupsService } from './services/groups.service';
import { PostsService } from './services/posts.service';
import { ConversationsService } from './services/conversations.service';
import { CallsService } from './services/calls.service';
import { NotificationsService } from './services/notifications.service';
import { EventsService } from './services/events.service';
import { OutboxService } from './services/outbox.service';

@Module({
  imports: [PrismaModule],
  controllers: [
    ProfilesController,
    FriendsController,
    GroupsController,
    PostsController,
    ConversationsController,
    ChatsController,
    CallsController,
    NotificationsController,
    EventsController,
  ],
  providers: [
    ProfilesService,
    FriendsService,
    GroupsService,
    PostsService,
    ConversationsService,
    CallsService,
    NotificationsService,
    EventsService,
    OutboxService,
  ],
})
export class SocialModule {}
