import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'nest-keycloak-connect';
import { Tenant } from '../common/tenant.decorator';
import type { TenantContext } from '../common/tenant-context';
import { AssessmentsService } from './assessments.service';
import { CreateAssessmentCategoryDto } from './dto/create-assessment-category.dto';
import { UpdateAssessmentCategoryDto } from './dto/update-assessment-category.dto';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';

@ApiTags('assessments')
@ApiBearerAuth()
@Controller('v1')
export class AssessmentsController {
  constructor(private readonly assessmentsService: AssessmentsService) {}

  @Get('assessment-categories')
  @Roles({ roles: ['TENANT_ADMIN', 'FACULTY', 'STUDENT'] })
  findAllCategories(@Tenant() tenant: TenantContext) {
    return this.assessmentsService.findAllCategories(tenant);
  }

  @Post('assessment-categories')
  @Roles({ roles: ['TENANT_ADMIN', 'FACULTY'] })
  createCategory(@Body() dto: CreateAssessmentCategoryDto, @Tenant() tenant: TenantContext) {
    return this.assessmentsService.createCategory(dto, tenant);
  }

  @Get('assessment-categories/:id')
  @Roles({ roles: ['TENANT_ADMIN', 'FACULTY', 'STUDENT'] })
  findOneCategory(@Param('id') id: string, @Tenant() tenant: TenantContext) {
    return this.assessmentsService.findOneCategory(id, tenant);
  }

  @Patch('assessment-categories/:id')
  @Roles({ roles: ['TENANT_ADMIN', 'FACULTY'] })
  updateCategory(@Param('id') id: string, @Body() dto: UpdateAssessmentCategoryDto, @Tenant() tenant: TenantContext) {
    return this.assessmentsService.updateCategory(id, dto, tenant);
  }

  @Delete('assessment-categories/:id')
  @Roles({ roles: ['TENANT_ADMIN', 'FACULTY'] })
  deleteCategory(@Param('id') id: string, @Tenant() tenant: TenantContext) {
    return this.assessmentsService.deleteCategory(id, tenant);
  }

  @Get('assessments')
  @Roles({ roles: ['TENANT_ADMIN', 'FACULTY', 'STUDENT'] })
  findAllAssessments(@Tenant() tenant: TenantContext) {
    return this.assessmentsService.findAllAssessments(tenant);
  }

  @Post('assessments')
  @Roles({ roles: ['TENANT_ADMIN', 'FACULTY'] })
  createAssessment(@Body() dto: CreateAssessmentDto, @Tenant() tenant: TenantContext) {
    return this.assessmentsService.createAssessment(dto, tenant);
  }

  @Get('assessments/:id')
  @Roles({ roles: ['TENANT_ADMIN', 'FACULTY', 'STUDENT'] })
  findOneAssessment(@Param('id') id: string, @Tenant() tenant: TenantContext) {
    return this.assessmentsService.findOneAssessment(id, tenant);
  }

  @Patch('assessments/:id')
  @Roles({ roles: ['TENANT_ADMIN', 'FACULTY'] })
  updateAssessment(@Param('id') id: string, @Body() dto: UpdateAssessmentDto, @Tenant() tenant: TenantContext) {
    return this.assessmentsService.updateAssessment(id, dto, tenant);
  }

  @Delete('assessments/:id')
  @Roles({ roles: ['TENANT_ADMIN', 'FACULTY'] })
  deleteAssessment(@Param('id') id: string, @Tenant() tenant: TenantContext) {
    return this.assessmentsService.deleteAssessment(id, tenant);
  }

  @Post('assessments/:id/publish')
  @Roles({ roles: ['TENANT_ADMIN', 'FACULTY'] })
  publishAssessment(@Param('id') id: string, @Tenant() tenant: TenantContext) {
    return this.assessmentsService.publishAssessment(id, tenant);
  }
}
