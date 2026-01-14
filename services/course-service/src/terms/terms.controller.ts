import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Roles } from 'nest-keycloak-connect';
import { TermsService } from './terms.service';
import { TenantContextParam } from '../common/tenant-context.decorator';
import { TenantContext } from '../common/tenant-context';
import { CreateTermDto } from './dto/create-term.dto';

@Controller('v1/terms')
export class TermsController {
  constructor(private readonly termsService: TermsService) {}

  @Post()
  @Roles({ roles: ['TENANT_ADMIN'] })
  create(
    @TenantContextParam() tenantContext: TenantContext,
    @Body() dto: CreateTermDto,
  ) {
    return this.termsService.create(tenantContext.effectiveTenantId, dto);
  }

  @Get()
  @Roles({ roles: ['TENANT_ADMIN', 'STAFF', 'FACULTY'] })
  findAll(
    @TenantContextParam() tenantContext: TenantContext,
    @Query('academicYearId') academicYearId?: string,
  ) {
    return this.termsService.findAll(tenantContext.effectiveTenantId, academicYearId);
  }
}
