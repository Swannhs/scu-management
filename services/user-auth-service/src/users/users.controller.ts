import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthenticatedUser, Public, Roles } from 'nest-keycloak-connect';
import { UsersService } from './users.service';
import { Role } from '@prisma/client';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('me')
    async getMe(@AuthenticatedUser() user: any) {
        const localUser = await this.usersService.findByKeycloakId(user.sub);
        return {
            ...user,
            localInfo: localUser,
        };
    }

    @Post('onboard')
    @Roles({ roles: ['realm:admin', 'realm:TENANT_ADMIN'] })
    async onboardUser(@Body() data: { email: string; keycloakId: string; tenantId: string; role: Role }) {
        return this.usersService.createUser(data);
    }

    @Get()
    @Roles({ roles: ['realm:admin'] })
    async findAll(@AuthenticatedUser() user: any) {
        // This could return all users if admin, or filtered by tenant if tenant admin
        return [];
    }
}
