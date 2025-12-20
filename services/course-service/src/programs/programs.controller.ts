import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AuthenticatedUser, Roles } from 'nest-keycloak-connect';
import { ProgramsService } from './programs.service';
import { ProgramType } from '@prisma/client';

@Controller('programs')
export class ProgramsController {
    constructor(private readonly programsService: ProgramsService) { }

    @Post()
    @Roles({ roles: ['realm:TENANT_ADMIN', 'realm:ADMISSION_OFFICER'] })
    async create(
        @AuthenticatedUser() user: any,
        @Body() data: { name: string; code: string; type: ProgramType },
    ) {
        const tenantId = user.tenant_id;
        return this.programsService.create(tenantId, data);
    }

    @Get()
    async findAll(@AuthenticatedUser() user: any) {
        const tenantId = user.tenant_id;
        return this.programsService.findAll(tenantId);
    }

    @Get(':id/structure')
    async getStructure(@AuthenticatedUser() user: any, @Param('id') id: string) {
        const tenantId = user.tenant_id;
        return this.programsService.getStructure(tenantId, id);
    }
}
