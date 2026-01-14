import { Body, Controller, ForbiddenException, Get, Param, Post, Query } from '@nestjs/common';
import { AuthenticatedUser, Roles } from 'nest-keycloak-connect';
import { GradingService } from './grading.service';
import { TenantContextParam } from '../common/tenant-context.decorator';
import { TenantContext } from '../common/tenant-context';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { BulkScoreDto } from './dto/bulk-score.dto';
import { ComputeFinalGradesDto } from './dto/compute-final-grades.dto';

@Controller('v1')
export class GradingController {
  constructor(private readonly gradingService: GradingService) {}

  @Post('assessments')
  @Roles({ roles: ['FACULTY'] })
  createAssessment(
    @TenantContextParam() tenantContext: TenantContext,
    @AuthenticatedUser() user: any,
    @Body() dto: CreateAssessmentDto,
  ) {
    return this.gradingService.createAssessment(tenantContext.effectiveTenantId, dto);
  }

  @Post('assessments/:id/scores')
  @Roles({ roles: ['FACULTY'] })
  recordScores(
    @TenantContextParam() tenantContext: TenantContext,
    @Body() dto: BulkScoreDto,
    @Param('id') assessmentId: string,
  ) {
    return this.gradingService.recordScores(tenantContext.effectiveTenantId, assessmentId, dto);
  }

  @Post('final-grades/compute')
  @Roles({ roles: ['REGISTRAR'] })
  computeFinalGrades(
    @TenantContextParam() tenantContext: TenantContext,
    @Query('sectionId') sectionId: string,
    @Body() dto: ComputeFinalGradesDto,
  ) {
    return this.gradingService.computeFinalGrades(tenantContext.effectiveTenantId, sectionId, dto);
  }

  @Get('students/:studentId/transcript')
  @Roles({ roles: ['STUDENT', 'REGISTRAR', 'TENANT_ADMIN'] })
  getTranscript(
    @TenantContextParam() tenantContext: TenantContext,
    @AuthenticatedUser() user: any,
    @Param('studentId') studentId: string,
  ) {
    if (user?.realm_access?.roles?.includes('STUDENT') && user?.sub !== studentId) {
      throw new ForbiddenException('FORBIDDEN');
    }
    return this.gradingService.getTranscript(tenantContext.effectiveTenantId, studentId);
  }
}
