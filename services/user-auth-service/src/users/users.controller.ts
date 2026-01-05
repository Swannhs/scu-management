import { BadRequestException, Controller, Get, Post, Body, Query } from '@nestjs/common';
import { AuthenticatedUser, Roles } from 'nest-keycloak-connect';
import { UsersService } from './users.service';
import { Role } from '@prisma/client';
import { OnboardUserDto } from './dto/onboard-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('me')
    async getMe(@AuthenticatedUser() user: any) {
        const tenantId = this.resolveTenant(user);
        const localUser = await this.usersService.findByKeycloakId(user.sub, tenantId);
        return {
            ...user,
            localInfo: localUser,
        };
    }

    @Post('onboard')
    @Roles({ roles: ['realm:admin', 'realm:TENANT_ADMIN'] })
    async onboardUser(@AuthenticatedUser() user: any, @Body() data: OnboardUserDto) {
        // Tenant admins can only onboard into their own tenant. Global admins must specify tenantId explicitly.
        const tenantId = this.resolveTenant(user, data.tenantId);
        return this.usersService.createUser({
            email: data.email,
            keycloakId: data.keycloakId,
            tenantId,
            role: data.role,
        });
    }

    @Get()
    @Roles({ roles: ['realm:admin', 'realm:TENANT_ADMIN'] })
    async findAll(@AuthenticatedUser() user: any, @Query('tenantId') tenantId?: string) {
        const resolvedTenantId = this.resolveTenant(user, tenantId);
        return this.usersService.findByTenant(resolvedTenantId);
    }

    private resolveTenant(user: any, requestedTenant?: string): string {
        const userTenant = user?.tenant_id;
        const isGlobalAdmin = user?.realm_access?.roles?.includes('admin');

        if (isGlobalAdmin) {
            const targetTenant = requestedTenant ?? userTenant;
            if (!targetTenant) {
                throw new BadRequestException('tenantId is required for global administrators');
            }
            return targetTenant;
        }

        if (!userTenant) {
            throw new BadRequestException('tenant context missing from token');
        }

        if (requestedTenant && requestedTenant !== userTenant) {
            throw new BadRequestException('Tenant administrators cannot act on other tenants');
        }

        return userTenant;
    }
}
