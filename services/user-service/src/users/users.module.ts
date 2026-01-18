import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MeController } from './me.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { OutboxModule } from '../outbox/outbox.module';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [
        PrismaModule,
        OutboxModule,
        HttpModule,
        // Removed ClientsModule registration for AUTH_SERVICE as we use OutboxModule now
    ],
    providers: [UsersService],
    controllers: [UsersController, MeController],
    exports: [UsersService],
})
export class UsersModule { }
