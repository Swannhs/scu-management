import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AuthenticatedUser, Roles } from 'nest-keycloak-connect';
import { CourseDataService } from './course-data.service';

@Controller('academic-ops')
export class OfferingsController {
    constructor(private readonly service: CourseDataService) { }

    @Post('subjects')
    @Roles({ roles: ['realm:TENANT_ADMIN', 'realm:FACULTY'] })
    async createSubject(@AuthenticatedUser() user: any, @Body() data: any) {
        return this.service.createSubject(user.tenant_id, data);
    }

    @Post('sections')
    @Roles({ roles: ['realm:TENANT_ADMIN'] })
    async createSection(@AuthenticatedUser() user: any, @Body() data: { name: string }) {
        return this.service.createSection(user.tenant_id, data.name);
    }

    @Post('offerings')
    @Roles({ roles: ['realm:TENANT_ADMIN'] })
    async createOffering(@AuthenticatedUser() user: any, @Body() data: any) {
        return this.service.createOffering(user.tenant_id, data);
    }

    @Get('offerings/:levelId')
    async getLevelOfferings(@AuthenticatedUser() user: any, @Param('levelId') levelId: string) {
        return this.service.findOfferingsByLevel(user.tenant_id, levelId);
    }
}
