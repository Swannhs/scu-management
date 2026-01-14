import { BadRequestException, ForbiddenException, Controller, Get, Post, Body, Query, Req, Injectable } from '@nestjs/common';
import { AuthenticatedUser, Roles } from 'nest-keycloak-connect';
import { UsersService } from './users.service';
import { Role } from '@prisma/client';
import { OnboardUserDto } from './dto/onboard-user.dto';
import type { Request } from 'express';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('me')
    async getMe(@Req() req: Request, @AuthenticatedUser() user: any) {
        const tenantId = this.checkTenantContext(req, user);
        // "sub" is keycloak ID
        const localUser = await this.usersService.findByKeycloakId(user.sub, tenantId);
        return {
            ...user,
            localInfo: localUser,
        };
    }

    @Post('onboard')
    @Roles({ roles: ['admin', 'TENANT_ADMIN'] })
    async onboardUser(@Req() req: Request, @AuthenticatedUser() user: any, @Body() data: OnboardUserDto) {
        const tenantId = this.checkTenantContext(req, user, data.tenantId);
        return this.usersService.createUser({
            email: data.email,
            keycloakId: data.keycloakId,
            tenantId,
            role: data.role,
        });
    }

    @Get()
    @Roles({ roles: ['admin', 'TENANT_ADMIN'] })
    async findAll(@Req() req: Request, @AuthenticatedUser() user: any, @Query('tenantId') queryTenantId?: string) {
        const tenantId = this.checkTenantContext(req, user, queryTenantId);
        return this.usersService.findByTenant(tenantId);
    }

    /**
     * Enforces strict tenant context checks.
     * 1. Extracts X-Tenant-ID header.
     * 2. Extracts user.tenant_id from token (if available).
     * 3. Validates they match.
     * 4. Allows GLOBAL ADMIN override if needed (optional, but strict for now).
     */
    private checkTenantContext(req: Request, user: any, requestedTenant?: string): string {
        const headerTenant = req.headers['x-tenant-id'] as string;
        const tokenTenant = user?.tenant_id;
        const isGlobalAdmin = user?.realm_access?.roles?.includes('admin'); // 'admin' in realm_access

        // 1. If header and token both exist, they MUST match.
        if (headerTenant && tokenTenant && headerTenant !== tokenTenant) {
             throw new ForbiddenException('TENANT_CONTEXT_MISMATCH');
        }

        // 2. Determine effective tenant
        // If regular user, tokenTenant is authority.
        // If no token tenant (e.g. global admin or service account), fall back to header or requested.
        let effectiveTenant = tokenTenant || headerTenant || requestedTenant;

        // 3. Logic for Global Admin
        if (isGlobalAdmin) {
            // Global admin can impersonate/act on any tenant provided in header or body
            // If requestedTenant is provided (e.g. body/query), it takes precedence over header if logical
            effectiveTenant = requestedTenant || headerTenant || tokenTenant;

            if (!effectiveTenant) {
                 throw new BadRequestException('tenantId is required for global administrators');
            }

            // Note: If header is present, we enforce it matches requestedTenant for consistency,
            // or we allow global admin to just use one.
            // Let's enforce consistency if both present to avoid confusion.
            if (headerTenant && requestedTenant && headerTenant !== requestedTenant) {
                 throw new BadRequestException('Header X-Tenant-ID and requested tenantId mismatch');
            }

            return effectiveTenant;
        }

        // 4. Logic for Regular User / Tenant Admin
        if (!effectiveTenant) {
             throw new BadRequestException('Tenant context is missing');
        }

        // If user is bound to a tenant (tokenTenant), they cannot act on another.
        if (tokenTenant && requestedTenant && tokenTenant !== requestedTenant) {
             throw new ForbiddenException('You cannot perform actions on another tenant');
        }

        // Final check: header vs effective (if header was missing but token present, we are good)
        // If header was present, we already checked mismatch above.

        return effectiveTenant;
    }
}
