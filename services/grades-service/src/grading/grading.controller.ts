import { Body, Controller, ForbiddenException, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { AuthenticatedUser, Roles } from 'nest-keycloak-connect';
import { GradingService } from './grading.service';
import { TenantContextParam } from '../common/tenant-context.decorator';
import type { TenantContext } from '../common/tenant-context';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { BulkScoreDto } from './dto/bulk-score.dto';
import { ComputeFinalGradesDto } from './dto/compute-final-grades.dto';
import type { KeycloakUser } from '../common/keycloak-user.interface';

@Controller('v1')
export class GradingController {
  constructor(private readonly gradingService: GradingService) {}

  @Post('assessments')
  @Roles({ roles: ['FACULTY'] })
  createAssessment(
    @TenantContextParam() tenantContext: TenantContext,
    @AuthenticatedUser() user: KeycloakUser,
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
  @Roles({ roles: ['STUDENT', 'REGISTRAR', 'TENANT_ADMIN', 'FACULTY'] })
  getTranscript(
    @TenantContextParam() tenantContext: TenantContext,
    @AuthenticatedUser() user: KeycloakUser,
    @Param('studentId') studentId: string,
  ) {
    if (user?.realm_access?.roles?.includes('STUDENT') && user?.sub !== studentId) {
      throw new ForbiddenException('FORBIDDEN');
    }
    return this.gradingService.getTranscript(tenantContext.effectiveTenantId, studentId);
  }

  @Get('students/:studentId/performance')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN', 'REGISTRAR'] })
  getStudentPerformance(
    @TenantContextParam() tenantContext: TenantContext,
    @AuthenticatedUser() user: KeycloakUser,
    @Param('studentId') studentId: string,
    @Query('termId') termId?: string,
  ) {
    if (user?.realm_access?.roles?.includes('STUDENT') && user?.sub !== studentId) {
      throw new ForbiddenException('FORBIDDEN');
    }
    return this.gradingService.getStudentPerformance(tenantContext.effectiveTenantId, studentId, termId);
  }

  @Get('students/:studentId/term-grades')
  @Roles({ roles: ['STUDENT', 'TENANT_ADMIN', 'REGISTRAR', 'FACULTY'] })
  getTermGrades(
    @TenantContextParam() tenantContext: TenantContext,
    @AuthenticatedUser() user: KeycloakUser,
    @Param('studentId') studentId: string,
    @Query('termId') termId: string,
  ) {
    return this.gradingService.getTermGrades(tenantContext.effectiveTenantId, studentId, termId);
  }

  @Get('sections/:sectionId/gradebook')
  @Roles({ roles: ['FACULTY', 'TENANT_ADMIN', 'REGISTRAR'] })
  getGradebook(@TenantContextParam() tenantContext: TenantContext, @Param('sectionId') sectionId: string) {
    return this.gradingService.getGradebook(tenantContext.effectiveTenantId, sectionId);
  }

  @Post('sections/:sectionId/publish-grades')
  @Roles({ roles: ['FACULTY', 'TENANT_ADMIN', 'REGISTRAR'] })
  publishGrades(@TenantContextParam() tenantContext: TenantContext, @Param('sectionId') sectionId: string) {
    return this.gradingService.publishGrades(tenantContext.effectiveTenantId, sectionId);
  }

  @Get('gradebooks/sections/:sectionId')
  @Roles({ roles: ['FACULTY', 'TENANT_ADMIN', 'REGISTRAR'] })
  getGradebookBySection(@TenantContextParam() tenantContext: TenantContext, @Param('sectionId') sectionId: string) {
    return this.gradingService.getGradebook(tenantContext.effectiveTenantId, sectionId);
  }

  @Post('gradebooks/sections/:sectionId/items')
  @Roles({ roles: ['FACULTY', 'TENANT_ADMIN'] })
  createGradebookItem(
    @TenantContextParam() tenantContext: TenantContext,
    @Param('sectionId') sectionId: string,
    @Body() dto: CreateAssessmentDto,
  ) {
    return this.gradingService.createAssessment(tenantContext.effectiveTenantId, { ...dto, sectionId });
  }

  @Patch('gradebooks/items/:itemId')
  @Roles({ roles: ['FACULTY', 'TENANT_ADMIN'] })
  patchGradebookItem(
    @TenantContextParam() tenantContext: TenantContext,
    @Param('itemId') itemId: string,
    @Body() dto: Partial<CreateAssessmentDto>,
  ) {
    return this.gradingService.updateAssessmentItem(tenantContext.effectiveTenantId, itemId, dto);
  }

  @Post('gradebooks/items/:itemId/scores')
  @Roles({ roles: ['FACULTY', 'TENANT_ADMIN'] })
  postItemScore(
    @TenantContextParam() tenantContext: TenantContext,
    @Param('itemId') itemId: string,
    @Body() payload: { studentId: string; score: number; remarks?: string },
  ) {
    return this.gradingService.recordSingleScore(tenantContext.effectiveTenantId, itemId, payload);
  }

  @Post('gradebooks/items/:itemId/bulk-scores')
  @Roles({ roles: ['FACULTY', 'TENANT_ADMIN'] })
  postItemBulkScores(
    @TenantContextParam() tenantContext: TenantContext,
    @Param('itemId') itemId: string,
    @Body() dto: BulkScoreDto,
  ) {
    return this.gradingService.recordScores(tenantContext.effectiveTenantId, itemId, dto);
  }

  @Get('gradebooks/students/:studentId/sections/:sectionId')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN', 'REGISTRAR'] })
  getStudentSectionGradebook(
    @TenantContextParam() tenantContext: TenantContext,
    @AuthenticatedUser() user: KeycloakUser,
    @Param('studentId') studentId: string,
    @Param('sectionId') sectionId: string,
  ) {
    if (user?.realm_access?.roles?.includes('STUDENT') && user?.sub !== studentId) {
      throw new ForbiddenException('FORBIDDEN');
    }
    return this.gradingService.getStudentSectionGradebook(tenantContext.effectiveTenantId, studentId, sectionId);
  }

  @Post('grades/sections/:sectionId/calculate')
  @Roles({ roles: ['FACULTY', 'TENANT_ADMIN', 'REGISTRAR'] })
  calculateSectionGrades(
    @TenantContextParam() tenantContext: TenantContext,
    @Param('sectionId') sectionId: string,
    @Body() dto: ComputeFinalGradesDto,
  ) {
    return this.gradingService.computeFinalGrades(tenantContext.effectiveTenantId, sectionId, dto);
  }

  @Post('grades/sections/:sectionId/publish')
  @Roles({ roles: ['FACULTY', 'TENANT_ADMIN', 'REGISTRAR'] })
  publishSectionGrades(@TenantContextParam() tenantContext: TenantContext, @Param('sectionId') sectionId: string) {
    return this.gradingService.publishGrades(tenantContext.effectiveTenantId, sectionId);
  }

  @Get('grades/students/:studentId')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN', 'REGISTRAR'] })
  getStudentGrades(
    @TenantContextParam() tenantContext: TenantContext,
    @AuthenticatedUser() user: KeycloakUser,
    @Param('studentId') studentId: string,
  ) {
    if (user?.realm_access?.roles?.includes('STUDENT') && user?.sub !== studentId) {
      throw new ForbiddenException('FORBIDDEN');
    }
    return this.gradingService.getStudentGrades(tenantContext.effectiveTenantId, studentId);
  }

  @Get('grades/me')
  @Roles({ roles: ['STUDENT'] })
  getMyGrades(@TenantContextParam() tenantContext: TenantContext, @AuthenticatedUser() user: KeycloakUser) {
    return this.gradingService.getStudentGrades(tenantContext.effectiveTenantId, user.sub);
  }

  @Get('gpa/students/:studentId')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN', 'REGISTRAR'] })
  getStudentGpa(
    @TenantContextParam() tenantContext: TenantContext,
    @AuthenticatedUser() user: KeycloakUser,
    @Param('studentId') studentId: string,
  ) {
    if (user?.realm_access?.roles?.includes('STUDENT') && user?.sub !== studentId) {
      throw new ForbiddenException('FORBIDDEN');
    }
    return this.gradingService.getStudentGpa(tenantContext.effectiveTenantId, studentId);
  }

  @Get('gpa/me')
  @Roles({ roles: ['STUDENT'] })
  getMyGpa(@TenantContextParam() tenantContext: TenantContext, @AuthenticatedUser() user: KeycloakUser) {
    return this.gradingService.getStudentGpa(tenantContext.effectiveTenantId, user.sub);
  }

  @Get('transcripts/students/:studentId')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN', 'REGISTRAR'] })
  getStudentTranscript(
    @TenantContextParam() tenantContext: TenantContext,
    @AuthenticatedUser() user: KeycloakUser,
    @Param('studentId') studentId: string,
  ) {
    if (user?.realm_access?.roles?.includes('STUDENT') && user?.sub !== studentId) {
      throw new ForbiddenException('FORBIDDEN');
    }
    return this.gradingService.getTranscript(tenantContext.effectiveTenantId, studentId);
  }

  @Get('transcripts/me')
  @Roles({ roles: ['STUDENT'] })
  getMyTranscript(@TenantContextParam() tenantContext: TenantContext, @AuthenticatedUser() user: KeycloakUser) {
    return this.gradingService.getTranscript(tenantContext.effectiveTenantId, user.sub);
  }

  @Get('transcripts/students/:studentId/summary')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN', 'REGISTRAR'] })
  getStudentTranscriptSummary(
    @TenantContextParam() tenantContext: TenantContext,
    @AuthenticatedUser() user: KeycloakUser,
    @Param('studentId') studentId: string,
  ) {
    if (user?.realm_access?.roles?.includes('STUDENT') && user?.sub !== studentId) {
      throw new ForbiddenException('FORBIDDEN');
    }
    return this.gradingService.getTranscriptSummary(tenantContext.effectiveTenantId, studentId);
  }
}
