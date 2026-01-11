import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role, User } from '@prisma/client';
import { OutboxService } from '../outbox/outbox.service';

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService,
        private outboxService: OutboxService,
    ) { }

    async createUser(data: {
        email: string;
        keycloakId: string;
        tenantId: string;
        role: Role;
    }): Promise<User> {
        // We use a transaction to ensure user creation and event publishing are atomic
        return await this.prisma.$transaction(async (tx) => {
            const existing = await tx.user.findFirst({
                where: { email: data.email, tenantId: data.tenantId },
            });

            if (existing) {
                return existing;
            }

            const user = await tx.user.create({
                data: {
                    email: data.email,
                    keycloakId: data.keycloakId,
                    tenantId: data.tenantId,
                    role: data.role,
                },
            });

            await this.outboxService.createEvent(tx, {
                tenantId: user.tenantId,
                eventType: 'user.created',
                payload: {
                    userId: user.id,
                    email: user.email,
                    role: user.role,
                    keycloakId: user.keycloakId,
                },
            });

            return user;
        });
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
