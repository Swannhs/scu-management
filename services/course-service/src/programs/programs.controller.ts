import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { Roles } from 'nest-keycloak-connect';
import { ProgramsService } from './programs.service';
import { TenantContextParam } from '../common/tenant-context.decorator';
import { TenantContext } from '../common/tenant-context';
import { CreateProgramDto } from './dto/create-program.dto';

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

    @Get(':id/structure')
    @Roles({ roles: ['TENANT_ADMIN', 'STAFF', 'FACULTY'] })
    async getStructure(@TenantContextParam() tenantContext: TenantContext, @Param('id') id: string) {
        return this.programsService.getStructure(tenantContext.effectiveTenantId, id);
    }
}
