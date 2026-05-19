import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { SubmitExamDto } from './dto/submit-exam.dto';
import { Tenant } from '../common/tenant.decorator';
import type { TenantContext } from '../common/tenant-context';
import { Roles } from 'nest-keycloak-connect';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { GradeSubmissionDto } from './dto/grade-submission.dto';

@ApiTags('submissions')
@ApiBearerAuth()
@Controller()
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Post('exams/:examId/submit')
  @Roles({ roles: ['STUDENT'] })
  submitLegacy(@Param('examId') examId: string, @Body() submitExamDto: SubmitExamDto, @Tenant() tenant: TenantContext) {
    return this.submissionsService.submit(examId, submitExamDto, tenant);
  }

  @Get('v1/assessments/:assessmentId/submissions')
  @Roles({ roles: ['TENANT_ADMIN', 'FACULTY'] })
  listByAssessment(@Param('assessmentId') assessmentId: string, @Tenant() tenant: TenantContext) {
    return this.submissionsService.listByAssessment(assessmentId, tenant);
  }

  @Post('v1/assessments/:assessmentId/submissions')
  @Roles({ roles: ['STUDENT'] })
  create(
    @Param('assessmentId') assessmentId: string,
    @Body() dto: CreateSubmissionDto,
    @Tenant() tenant: TenantContext,
  ) {
    return this.submissionsService.createSubmission(assessmentId, dto, tenant);
  }

  @Get('v1/submissions/:id')
  @Roles({ roles: ['TENANT_ADMIN', 'FACULTY', 'STUDENT'] })
  getOne(@Param('id') id: string, @Tenant() tenant: TenantContext) {
    return this.submissionsService.getSubmission(id, tenant);
  }

  @Patch('v1/submissions/:id')
  @Roles({ roles: ['TENANT_ADMIN', 'FACULTY', 'STUDENT'] })
  update(@Param('id') id: string, @Body() dto: UpdateSubmissionDto, @Tenant() tenant: TenantContext) {
    return this.submissionsService.updateSubmission(id, dto, tenant);
  }

  @Post('v1/submissions/:id/grade')
  @Roles({ roles: ['TENANT_ADMIN', 'FACULTY'] })
  grade(@Param('id') id: string, @Body() dto: GradeSubmissionDto, @Tenant() tenant: TenantContext) {
    return this.submissionsService.gradeSubmission(id, dto, tenant);
  }
}
