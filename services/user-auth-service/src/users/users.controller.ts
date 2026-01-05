import { BadRequestException, Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { AuthenticatedUser, Roles } from 'nest-keycloak-connect';
import { UsersService } from './users.service';
import { Role } from '@prisma/client';
import { OnboardUserDto } from './dto/onboard-user.dto';
import { TenantContextFactory } from '../common/tenant-context';
import { Request } from 'express';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('me')
    async getMe(@AuthenticatedUser() user: any, @Req() req: Request) {
        const tenantContext = TenantContextFactory.fromRequest(user, req);
        const localUser = await this.usersService.findByKeycloakId(user.sub, tenantContext.effectiveTenantId);
        return {
            ...user,
            localInfo: localUser,
        };
    }

    @Post('onboard')
    @Roles({ roles: ['realm:admin', 'realm:TENANT_ADMIN'] })
    async onboardUser(@AuthenticatedUser() user: any, @Body() data: OnboardUserDto, @Req() req: Request) {
        const tenantContext = TenantContextFactory.fromRequest(user, req, data.tenantId);
        this.assertRoleAssignmentAllowed(tenantContext.isGlobalAdmin, data.role);

        return this.usersService.createUser(
            {
                email: data.email,
                keycloakId: data.keycloakId,
                tenantId: tenantContext.effectiveTenantId,
                role: data.role,
            },
            tenantContext.actor,
        );
    }

    @Get()
    @Roles({ roles: ['realm:admin', 'realm:TENANT_ADMIN'] })
    async findAll(@AuthenticatedUser() user: any, @Query('tenantId') tenantId: string | undefined, @Req() req: Request) {
        const tenantContext = TenantContextFactory.fromRequest(user, req, tenantId);
        return this.usersService.findByTenant(tenantContext.effectiveTenantId);
    }

    private assertRoleAssignmentAllowed(isGlobalAdmin: boolean, role: Role) {
        const tenantAssignableRoles: Role[] = [
            Role.FACULTY,
            Role.STUDENT,
            Role.LIBRARIAN,
            Role.WARDEN,
            Role.ACCOUNTANT,
            Role.ADMISSION_OFFICER,
        ];

        if (isGlobalAdmin) {
            return;
        }

        if (!tenantAssignableRoles.includes(role)) {
            throw new BadRequestException('Tenant administrators cannot assign this role');
        }
    }
}
