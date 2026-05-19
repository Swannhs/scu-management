import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Delete,
  Post,
  Query,
} from '@nestjs/common';
import { AuthenticatedUser, Roles } from 'nest-keycloak-connect';
import { AttendanceService } from './attendance.service';
import { TenantContextParam } from '../common/tenant-context.decorator';
import type { TenantContext } from '../common/tenant-context';
import { CreateAttendanceSessionDto } from './dto/create-attendance-session.dto';
import { UpdateAttendanceSessionDto } from './dto/update-attendance-session.dto';
import { MarkAttendanceDto } from './dto/mark-attendance.dto';
import { CreateAttendanceMarkDto } from './dto/create-attendance-mark.dto';
import { BulkAttendanceMarksDto } from './dto/bulk-attendance-marks.dto';
import { UpdateAttendanceMarkDto } from './dto/update-attendance-mark.dto';
import type { KeycloakUser } from '../common/keycloak-user.interface';

@Controller('v1')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Get('attendance/sessions')
  @Roles({ roles: ['FACULTY', 'TENANT_ADMIN', 'REGISTRAR', 'STAFF'] })
  listSessions(
    @TenantContextParam() tenantContext: TenantContext,
    @Query('sectionId') sectionId?: string,
  ) {
    return this.attendanceService.listSessions(tenantContext.effectiveTenantId, sectionId);
  }

  @Post('attendance/sessions')
  @Roles({ roles: ['FACULTY', 'TENANT_ADMIN', 'REGISTRAR'] })
  createSession(
    @TenantContextParam() tenantContext: TenantContext,
    @AuthenticatedUser() user: KeycloakUser,
    @Body() dto: CreateAttendanceSessionDto,
  ) {
    return this.attendanceService.createSession(tenantContext.effectiveTenantId, user?.sub, dto);
  }

  @Get('attendance/sessions/:id')
  @Roles({ roles: ['FACULTY', 'TENANT_ADMIN', 'REGISTRAR', 'STAFF'] })
  getSession(
    @TenantContextParam() tenantContext: TenantContext,
    @Param('id') id: string,
  ) {
    return this.attendanceService.getSessionById(tenantContext.effectiveTenantId, id);
  }

  @Patch('attendance/sessions/:id')
  @Roles({ roles: ['FACULTY', 'TENANT_ADMIN', 'REGISTRAR'] })
  patchSession(
    @TenantContextParam() tenantContext: TenantContext,
    @Param('id') id: string,
    @Body() dto: UpdateAttendanceSessionDto,
  ) {
    return this.attendanceService.updateSession(tenantContext.effectiveTenantId, id, dto);
  }

  @Delete('attendance/sessions/:id')
  @Roles({ roles: ['TENANT_ADMIN', 'REGISTRAR'] })
  deleteSession(
    @TenantContextParam() tenantContext: TenantContext,
    @Param('id') id: string,
  ) {
    return this.attendanceService.deleteSession(tenantContext.effectiveTenantId, id);
  }

  @Post('attendance/sessions/:id/marks')
  @Roles({ roles: ['FACULTY', 'TENANT_ADMIN', 'REGISTRAR'] })
  markOne(
    @TenantContextParam() tenantContext: TenantContext,
    @Param('id') sessionId: string,
    @Body() dto: CreateAttendanceMarkDto,
  ) {
    return this.attendanceService.createMark(tenantContext.effectiveTenantId, sessionId, dto);
  }

  @Post('attendance/sessions/:id/bulk-marks')
  @Roles({ roles: ['FACULTY', 'TENANT_ADMIN', 'REGISTRAR'] })
  markBulk(
    @TenantContextParam() tenantContext: TenantContext,
    @Param('id') sessionId: string,
    @Body() dto: BulkAttendanceMarksDto,
  ) {
    return this.attendanceService.createBulkMarks(tenantContext.effectiveTenantId, sessionId, dto);
  }

  @Patch('attendance/marks/:markId')
  @Roles({ roles: ['FACULTY', 'TENANT_ADMIN', 'REGISTRAR'] })
  updateMark(
    @TenantContextParam() tenantContext: TenantContext,
    @Param('markId') markId: string,
    @Body() dto: UpdateAttendanceMarkDto,
  ) {
    return this.attendanceService.updateMark(tenantContext.effectiveTenantId, markId, dto);
  }

  @Get('attendance/sessions/:id/marks')
  @Roles({ roles: ['FACULTY', 'TENANT_ADMIN', 'REGISTRAR', 'STAFF'] })
  getSessionMarks(
    @TenantContextParam() tenantContext: TenantContext,
    @Param('id') sessionId: string,
  ) {
    return this.attendanceService.getSessionMarks(tenantContext.effectiveTenantId, sessionId);
  }

  @Post('attendance/sessions/:id/mark')
  @Roles({ roles: ['FACULTY'] })
  markAttendance(
    @TenantContextParam() tenantContext: TenantContext,
    @Body() dto: MarkAttendanceDto,
    @Param('id') sessionId: string,
  ) {
    return this.attendanceService.markAttendance(tenantContext.effectiveTenantId, sessionId, dto);
  }

  @Get('students/:studentId/attendance')
  @Roles({ roles: ['STUDENT', 'TENANT_ADMIN', 'REGISTRAR', 'FACULTY'] })
  getStudentAttendance(
    @TenantContextParam() tenantContext: TenantContext,
    @AuthenticatedUser() user: KeycloakUser,
    @Param('studentId') studentId: string,
    @Query('termId') termId?: string,
    @Query('courseId') courseId?: string,
  ) {
    return this.attendanceService.getStudentAttendance(tenantContext.effectiveTenantId, studentId, termId, courseId);
  }

  @Get('students/:studentId/summary')
  @Roles({ roles: ['STUDENT', 'TENANT_ADMIN', 'REGISTRAR', 'FACULTY'] })
  getStudentSummary(
    @TenantContextParam() tenantContext: TenantContext,
    @AuthenticatedUser() user: KeycloakUser,
    @Param('studentId') studentId: string,
  ) {
    if (user?.realm_access?.roles?.includes('STUDENT') && user?.sub !== studentId) {
      throw new ForbiddenException('FORBIDDEN');
    }
    return this.attendanceService.getStudentSummary(tenantContext.effectiveTenantId, studentId);
  }

  @Get('sections/:sectionId/attendance')
  @Roles({ roles: ['FACULTY', 'TENANT_ADMIN', 'REGISTRAR'] })
  getSectionAttendance(
    @TenantContextParam() tenantContext: TenantContext,
    @Param('sectionId') sectionId: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.attendanceService.getSectionAttendance(tenantContext.effectiveTenantId, sectionId, from, to);
  }

  @Post('sections/:sectionId/attendance-sessions')
  @Roles({ roles: ['FACULTY'] })
  createSessionForSection(
    @TenantContextParam() tenantContext: TenantContext,
    @AuthenticatedUser() user: KeycloakUser,
    @Param('sectionId') sectionId: string,
    @Body() dto: CreateAttendanceSessionDto,
  ) {
    dto.sectionId = sectionId;
    return this.attendanceService.createSession(tenantContext.effectiveTenantId, user?.sub, dto);
  }

  @Get('sections/:sectionId/attendance-sessions')
  @Roles({ roles: ['FACULTY'] })
  getSessionsForSection(
    @TenantContextParam() tenantContext: TenantContext,
    @Param('sectionId') sectionId: string,
  ) {
    return this.attendanceService.getSectionAttendance(tenantContext.effectiveTenantId, sectionId);
  }
}
