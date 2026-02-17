import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { AddQuestionDto } from './dto/add-question.dto';
import { Tenant } from '../common/tenant.decorator';
import type { TenantContext } from '../common/tenant-context';
import { Roles } from 'nest-keycloak-connect';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('exams')
@ApiBearerAuth()
@Controller('exams')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @Post()
  @Roles({ roles: ['TENANT_ADMIN', 'FACULTY'] })
  create(@Body() createExamDto: CreateExamDto, @Tenant() tenant: TenantContext) {
    return this.examsService.create(createExamDto, tenant);
  }

  @Get()
  @Roles({ roles: ['TENANT_ADMIN', 'FACULTY', 'STUDENT'] })
  findAll(@Tenant() tenant: TenantContext) {
    return this.examsService.findAll(tenant);
  }

  @Get(':id')
  @Roles({ roles: ['TENANT_ADMIN', 'FACULTY', 'STUDENT'] })
  findOne(@Param('id') id: string, @Tenant() tenant: TenantContext) {
    return this.examsService.findOne(id, tenant);
  }

  @Post(':id/questions')
  @Roles({ roles: ['TENANT_ADMIN', 'FACULTY'] })
  addQuestion(@Param('id') id: string, @Body() addQuestionDto: AddQuestionDto, @Tenant() tenant: TenantContext) {
    return this.examsService.addQuestion(id, addQuestionDto, tenant);
  }
}
