import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Tenant } from '../common/tenant.decorator';
import type { TenantContext } from '../common/tenant-context';
import { Roles } from 'nest-keycloak-connect';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('questions')
@ApiBearerAuth()
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  @Roles({ roles: ['TENANT_ADMIN', 'FACULTY'] })
  create(@Body() createQuestionDto: CreateQuestionDto, @Tenant() tenant: TenantContext) {
    return this.questionsService.create(createQuestionDto, tenant);
  }

  @Get()
  @Roles({ roles: ['TENANT_ADMIN', 'FACULTY'] })
  findAll(@Tenant() tenant: TenantContext) {
    return this.questionsService.findAll(tenant);
  }

  @Get(':id')
  @Roles({ roles: ['TENANT_ADMIN', 'FACULTY'] })
  findOne(@Param('id') id: string, @Tenant() tenant: TenantContext) {
    return this.questionsService.findOne(id, tenant);
  }

  @Patch(':id')
  @Roles({ roles: ['TENANT_ADMIN', 'FACULTY'] })
  update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto, @Tenant() tenant: TenantContext) {
    return this.questionsService.update(id, updateQuestionDto, tenant);
  }

  @Delete(':id')
  @Roles({ roles: ['TENANT_ADMIN', 'FACULTY'] })
  remove(@Param('id') id: string, @Tenant() tenant: TenantContext) {
    return this.questionsService.remove(id, tenant);
  }
}
