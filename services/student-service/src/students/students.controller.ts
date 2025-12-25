import { Controller, Get, Post, Body, Param, Put, UseGuards } from '@nestjs/common';
import { AuthenticatedUser, Roles } from 'nest-keycloak-connect';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
    constructor(private readonly studentsService: StudentsService) { }

    @Post()
    @Roles({ roles: ['realm:TENANT_ADMIN', 'realm:ADMISSION_OFFICER'] })
    async create(@AuthenticatedUser() user: any, @Body() data: any) {
        return this.studentsService.create(user.tenant_id, data);
    }

    @Get()
    async findAll(@AuthenticatedUser() user: any) {
        return this.studentsService.findAll(user.tenant_id);
    }

    @Get(':id')
    async findOne(@AuthenticatedUser() user: any, @Param('id') id: string) {
        return this.studentsService.findOne(user.tenant_id, id);
    }

    @Put(':id')
    @Roles({ roles: ['realm:TENANT_ADMIN', 'realm:ADMISSION_OFFICER'] })
    async update(
        @AuthenticatedUser() user: any,
        @Param('id') id: string,
        @Body() data: any,
    ) {
        return this.studentsService.update(user.tenant_id, id, data);
    }
}
