import { Injectable, ConflictException, InternalServerErrorException, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role, User } from '@prisma/client';
import { ClientProxy } from '@nestjs/microservices';

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
        const existing = await this.prisma.user.findUnique({
            where: { email: data.email },
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
            userId: user.id,
            email: user.email,
            tenantId: user.tenantId,
            role: user.role,
            keycloakId: user.keycloakId,
        });

        return user;
    }

    async findByKeycloakId(keycloakId: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { keycloakId },
        });
    }

    async findByTenant(tenantId: string): Promise<User[]> {
        return this.prisma.user.findMany({
            where: { tenantId },
        });
    }
}
