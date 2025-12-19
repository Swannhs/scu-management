import { PrismaService } from '../prisma/prisma.service';
import { Role, User } from '@prisma/client';
import { ClientProxy } from '@nestjs/microservices';
export declare class UsersService {
    private prisma;
    private client;
    constructor(prisma: PrismaService, client: ClientProxy);
    createUser(data: {
        email: string;
        keycloakId: string;
        tenantId: string;
        role: Role;
    }): Promise<User>;
    findByKeycloakId(keycloakId: string): Promise<User | null>;
    findByTenant(tenantId: string): Promise<User[]>;
}
