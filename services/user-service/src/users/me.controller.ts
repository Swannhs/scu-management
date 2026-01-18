import { Controller, Get, Req, ForbiddenException, BadRequestException, Patch, Body, Query } from '@nestjs/common';
import { AuthenticatedUser, Roles } from 'nest-keycloak-connect';
import { Request } from 'express';
import { UsersService } from './users.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller('v1/me')
export class MeController {
  constructor(
    private readonly usersService: UsersService,
    private readonly httpService: HttpService
  ) {}

  @Get()
  async getMe(@Req() req: Request, @AuthenticatedUser() user: any) {
    const tenantId = this.checkTenantContext(req, user);
    const localUser = await this.usersService.findByKeycloakId(user.sub, tenantId);

    const roles = user.realm_access?.roles || user.roles || [];

    return {
      userId: user.sub,
      tenantId: tenantId,
      roles: roles,
      linked: {
        studentId: localUser?.studentId || null,
        facultyId: localUser?.facultyId || null,
        parentId: localUser?.parentId || null,
      },
      firstName: localUser?.firstName || user.given_name,
      lastName: localUser?.lastName || user.family_name,
      email: localUser?.email || user.email,
      phone: localUser?.phone
    };
  }

  @Get('schedule')
  async getSchedule(
      @Req() req: Request,
      @AuthenticatedUser() user: any,
      @Query('from') from?: string,
      @Query('to') to?: string
  ) {
      const tenantId = this.checkTenantContext(req, user);
      const localUser = await this.usersService.findByKeycloakId(user.sub, tenantId);

      const roles = user.realm_access?.roles || user.roles || [];
      const token = req.headers['authorization'];
      const headers = {
          'Authorization': token,
          'X-Tenant-ID': tenantId
      };

      if (roles.includes('STUDENT')) {
          const studentId = localUser?.studentId;
          if (!studentId) {
             // Fallback: Check if student exists in enrollment service? No, rely on linked ID.
             return [];
          }

          try {
              // 1. Get Enrollments
              const enrollResponse = await firstValueFrom(
                  this.httpService.get(`http://enrollment-service:8000/v1/students/${studentId}/enrollments`, { headers })
              );
              const enrollments = enrollResponse.data;
              const sectionIds = enrollments.map((e: any) => e.offering_id || e.sectionId).filter(Boolean).join(',');

              if (!sectionIds) return [];

              // 2. Get Sessions
              const sessionsResponse = await firstValueFrom(
                  this.httpService.get(`http://course-service:3000/v1/sessions/list?sectionIds=${sectionIds}`, { headers })
              );
              return sessionsResponse.data;

          } catch (e) {
              console.error('Error fetching student schedule:', e.message);
              // Graceful degradation or error?
              // Instruction says: "Response errors: { code, message, details? }"
              throw new BadRequestException('Failed to fetch schedule');
          }
      } else if (roles.includes('FACULTY')) {
          // Faculty logic
          // Call course-service:3000/v1/sessions which returns sessions for the faculty user (from token)
           try {
              const sessionsResponse = await firstValueFrom(
                  this.httpService.get(`http://course-service:3000/v1/sessions`, { headers })
              );
              return sessionsResponse.data;
          } catch (e) {
               console.error('Error fetching faculty schedule:', e.message);
               throw new BadRequestException('Failed to fetch schedule');
          }
      } else if (roles.includes('PARENT')) {
           throw new ForbiddenException('Parents must use /parents/children/:id/updates');
      }

      return [];
  }

  @Get('grades')
  async getGrades(
      @Req() req: Request,
      @AuthenticatedUser() user: any,
      @Query('termId') termId?: string,
  ) {
      const tenantId = this.checkTenantContext(req, user);
      const localUser = await this.usersService.findByKeycloakId(user.sub, tenantId);

      const roles = user.realm_access?.roles || user.roles || [];
      const token = req.headers['authorization'];
      const headers = {
          'Authorization': token,
          'X-Tenant-ID': tenantId
      };

      if (roles.includes('STUDENT')) {
           const studentId = localUser?.studentId;
           if (!studentId) return [];

           let url = `http://grades-service:3000/v1/students/${studentId}`;
           if (termId) {
               // Use term-grades for specific term details
               url += `/term-grades?termId=${termId}`;
           } else {
               // Use performance for overall summary
               url += `/performance`;
           }

           try {
               const response = await firstValueFrom(this.httpService.get(url, { headers }));
               return response.data;
           } catch (e) {
               console.error('Error fetching grades:', e.message);
               throw new BadRequestException('Failed to fetch grades');
           }
      }
      return [];
  }

  @Get('attendance')
  async getAttendance(
      @Req() req: Request,
      @AuthenticatedUser() user: any,
      @Query('termId') termId?: string,
      @Query('courseId') courseId?: string
  ) {
      const tenantId = this.checkTenantContext(req, user);
      const localUser = await this.usersService.findByKeycloakId(user.sub, tenantId);

      const roles = user.realm_access?.roles || user.roles || [];
      const token = req.headers['authorization'];
      const headers = {
          'Authorization': token,
          'X-Tenant-ID': tenantId
      };

      if (roles.includes('STUDENT')) {
           const studentId = localUser?.studentId;
           if (!studentId) return [];

           let url = `http://attendance-service:3000/v1/students/${studentId}/attendance`;
           const params = new URLSearchParams();
           if (termId) params.append('termId', termId);
           if (courseId) params.append('courseId', courseId);
           if ([...params].length > 0) url += `?${params.toString()}`;

           try {
               const response = await firstValueFrom(this.httpService.get(url, { headers }));
               return response.data;
           } catch (e) {
               console.error('Error fetching attendance:', e.message);
               throw new BadRequestException('Failed to fetch attendance');
           }
      }

      return [];
  }

  @Patch('profile')
  async updateProfile(
      @Req() req: Request,
      @AuthenticatedUser() user: any,
      @Body() data: { firstName?: string; lastName?: string; phone?: string; }
  ) {
      const tenantId = this.checkTenantContext(req, user);

      // Basic validation
      if (data.phone && typeof data.phone !== 'string') {
          throw new BadRequestException('Invalid phone format');
      }

      try {
          const updatedUser = await this.usersService.updateProfile(user.sub, tenantId, data);
          return updatedUser;
      } catch (e) {
          if (e.message === 'User record not found') {
              throw new BadRequestException('User profile not initialized');
          }
          throw e;
      }
  }

  private checkTenantContext(req: Request, user: any, requestedTenant?: string): string {
      const headerTenant = req.headers['x-tenant-id'] as string;
      const tokenTenant = user?.tenant_id;
      const isGlobalAdmin = user?.realm_access?.roles?.includes('admin');

      if (headerTenant && tokenTenant && headerTenant !== tokenTenant) {
           throw new ForbiddenException('TENANT_CONTEXT_MISMATCH');
      }

      let effectiveTenant = tokenTenant || headerTenant || requestedTenant;

      if (isGlobalAdmin) {
          effectiveTenant = requestedTenant || headerTenant || tokenTenant;
          if (!effectiveTenant) {
               throw new BadRequestException('tenantId is required for global administrators');
          }
          if (headerTenant && requestedTenant && headerTenant !== requestedTenant) {
               throw new BadRequestException('Header X-Tenant-ID and requested tenantId mismatch');
          }
          return effectiveTenant;
      }

      if (!effectiveTenant) {
           throw new BadRequestException('Tenant context is missing');
      }

      if (tokenTenant && requestedTenant && tokenTenant !== requestedTenant) {
           throw new ForbiddenException('You cannot perform actions on another tenant');
      }

      return effectiveTenant;
  }
}
