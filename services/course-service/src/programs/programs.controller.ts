import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { Roles } from 'nest-keycloak-connect';
import { ProgramsService } from './programs.service';
import { TenantContextParam } from '../common/tenant-context.decorator';
import type { TenantContext } from '../common/tenant-context';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';

@Controller('v1/programs')
export class ProgramsController {
    constructor(private readonly programsService: ProgramsService) { }

    @Post()
    @Roles({ roles: ['TENANT_ADMIN'] })
    async create(
        @TenantContextParam() tenantContext: TenantContext,
        @Body() data: CreateProgramDto,
    ) {
        return this.programsService.create(tenantContext.effectiveTenantId, data);
    }

    @Get()
    @Roles({ roles: ['TENANT_ADMIN', 'STAFF', 'FACULTY'] })
    async findAll(@TenantContextParam() tenantContext: TenantContext) {
        return this.programsService.findAll(tenantContext.effectiveTenantId);
    }

    @Get(':id')
    @Roles({ roles: ['TENANT_ADMIN', 'STAFF', 'FACULTY'] })
    async findOne(
        @TenantContextParam() tenantContext: TenantContext,
        @Param('id') id: string,
    ) {
        return this.programsService.findOne(tenantContext.effectiveTenantId, id);
    }

    @Get(':id/structure')
    @Roles({ roles: ['TENANT_ADMIN', 'STAFF', 'FACULTY'] })
    async getStructure(@TenantContextParam() tenantContext: TenantContext, @Param('id') id: string) {
        return this.programsService.getStructure(tenantContext.effectiveTenantId, id);
    }

    @Patch(':id')
    @Roles({ roles: ['TENANT_ADMIN'] })
    async update(
        @TenantContextParam() tenantContext: TenantContext,
        @Param('id') id: string,
        @Body() data: UpdateProgramDto,
    ) {
        return this.programsService.update(tenantContext.effectiveTenantId, id, data);
    }
}
