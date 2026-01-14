import { Body, Controller, ForbiddenException, Get, Param, Post, Query } from '@nestjs/common';
import { AuthenticatedUser, Roles } from 'nest-keycloak-connect';
import { AttendanceService } from './attendance.service';
import { TenantContextParam } from '../common/tenant-context.decorator';
import { TenantContext } from '../common/tenant-context';
import { CreateAttendanceSessionDto } from './dto/create-attendance-session.dto';
import { MarkAttendanceDto } from './dto/mark-attendance.dto';

@Controller('v1')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('attendance/sessions')
  @Roles({ roles: ['FACULTY'] })
  createSession(
    @TenantContextParam() tenantContext: TenantContext,
    @AuthenticatedUser() user: any,
    @Body() dto: CreateAttendanceSessionDto,
  ) {
    return this.attendanceService.createSession(tenantContext.effectiveTenantId, user?.sub, dto);
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
    @AuthenticatedUser() user: any,
    @Param('studentId') studentId: string,
    @Query('termId') termId?: string,
  ) {
    if (user?.realm_access?.roles?.includes('STUDENT') && user?.sub !== studentId) {
      throw new ForbiddenException('FORBIDDEN');
    }
    return this.attendanceService.getStudentAttendance(tenantContext.effectiveTenantId, studentId, termId);
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
}
