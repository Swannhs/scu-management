import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { OutboxModule } from './outbox/outbox.module';
import { ProfilesController } from './profiles/profiles.controller';
import { FriendsController } from './friends/friends.controller';
import { GroupsController } from './groups/groups.controller';
import { PostsController } from './posts/posts.controller';
import { MessagingController } from './messaging/messaging.controller';
import { CallsController } from './calls/calls.controller';
import { NotificationsController } from './notifications/notifications.controller';
import { EventsConsumerService } from './events/consumers.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    OutboxModule,
  ],
  controllers: [
    ProfilesController,
    FriendsController,
    GroupsController,
    PostsController,
    MessagingController,
    CallsController,
    NotificationsController
  ],
  providers: [EventsConsumerService],
})
export class AppModule { }
