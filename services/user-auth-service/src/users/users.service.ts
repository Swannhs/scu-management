import { Injectable, ConflictException, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role, User } from '@prisma/client';
import { ClientProxy } from '@nestjs/microservices';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService,
        @Inject('AUTH_SERVICE') private client: ClientProxy,
    ) { }

    async createUser(data: {
        email: string;
        keycloakId: string;
        tenantId: string;
        role: Role;
    }): Promise<User> {
        const existing = await this.prisma.user.findFirst({
            where: { email: data.email, tenantId: data.tenantId },
        });

        if (existing) {
            throw new ConflictException('User already exists');
        }

        const user = await this.prisma.user.create({
            data: {
                email: data.email,
                keycloakId: data.keycloakId,
                tenantId: data.tenantId,
                role: data.role,
            },
        });

        this.client.emit('user.created', {
            eventId: randomUUID(),
            occurredAt: new Date().toISOString(),
            tenantId: user.tenantId,
            payload: {
                userId: user.id,
                email: user.email,
                role: user.role,
                keycloakId: user.keycloakId,
            },
        });

        return user;
    }

    async findByKeycloakId(keycloakId: string, tenantId: string): Promise<User | null> {
        return this.prisma.user.findFirst({
            where: { keycloakId, tenantId },
        });
    }

    async findByTenant(tenantId: string): Promise<User[]> {
        return this.prisma.user.findMany({
            where: { tenantId },
        });
    }
}
