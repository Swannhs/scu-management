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

    async updateProfile(keycloakId: string, tenantId: string, data: { firstName?: string; lastName?: string; phone?: string; }) {
        const user = await this.prisma.user.findFirst({
            where: { keycloakId, tenantId }
        });

        if (!user) {
            // If user doesn't exist in local DB, we can't update.
            // In a real scenario, we might auto-create, but we need email/role which might be in token.
            // For now, assume user exists (created via onboard or webhook).
            throw new Error('User record not found');
        }

        return this.prisma.user.update({
            where: { id: user.id },
            data: {
                ...(data.firstName ? { firstName: data.firstName } : {}),
                ...(data.lastName ? { lastName: data.lastName } : {}),
                ...(data.phone ? { phone: data.phone } : {}),
            }
        });
    }
}
