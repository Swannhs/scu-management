import { Controller, Get, Req, ForbiddenException, BadRequestException, Patch, Body, Query } from '@nestjs/common';
import { AuthenticatedUser as CurrentUser, Roles } from 'nest-keycloak-connect';
import { Request } from 'express';
import { UsersService } from './users.service';
import { AuthenticatedUser } from './interfaces/authenticated-user.interface';
import { UpdateMeProfileDto } from './dto/update-me-profile.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

interface AggregationResponse<T> {
  partial: boolean;
  errors: Array<{ service: string; reason: string }>;
  data: T;
}

@Controller('v1/me')
export class MeController {
  constructor(
    private readonly usersService: UsersService,
    private readonly httpService: HttpService
  ) {}

  @Get()
  async getMe(@Req() req: Request, @CurrentUser() user: AuthenticatedUser) {
    const tenantId = this.checkTenantContext(req, user);
    const localUser = await this.usersService.findByKeycloakId(user.sub, tenantId);

    const roles = user.realm_access?.roles || user.roles || [];

    return {
      userId: user.sub,
      tenantId: tenantId,
      roles: roles,
      studentId: localUser?.studentId || null,
      facultyId: localUser?.facultyId || null,
      parentId: localUser?.parentId || null,
    };
  }

  @Get('profile')
  async getProfile(@Req() req: Request, @CurrentUser() user: AuthenticatedUser) {
    const tenantId = this.checkTenantContext(req, user);
    const localUser = await this.usersService.findByKeycloakId(user.sub, tenantId);

    return {
      firstName: localUser?.firstName || user.given_name,
      lastName: localUser?.lastName || user.family_name,
      email: localUser?.email || user.email,
      phone: localUser?.phone,
      address: localUser?.address,
      avatarUrl: localUser?.avatarUrl,
      avatarRef: localUser?.avatarUrl,
      emergencyContact: localUser?.emergencyContact,
    };
  }

  @Patch('profile')
  async updateProfile(
      @Req() req: Request,
      @CurrentUser() user: AuthenticatedUser,
      @Body() data: UpdateMeProfileDto
  ) {
      const tenantId = this.checkTenantContext(req, user);

      if (data.avatarRef) {
          data.avatarUrl = data.avatarRef;
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

  @Get('schedule')
  async getSchedule(
      @Req() req: Request,
      @CurrentUser() user: AuthenticatedUser,
      @Query('from') from?: string,
      @Query('to') to?: string
  ): Promise<AggregationResponse<any[]>> {
      const tenantId = this.checkTenantContext(req, user);
      const localUser = await this.usersService.findByKeycloakId(user.sub, tenantId);

      const roles = user.realm_access?.roles || user.roles || [];
      const token = req.headers['authorization'];
      const headers = {
          'Authorization': token,
          'X-Tenant-ID': tenantId
      };

      const errors = [];
      let data = [];
      let partial = false;

      if (roles.includes('STUDENT')) {
          const studentId = localUser?.studentId;
          if (!studentId) {
             return { partial: false, errors: [], data: [] };
          }

          try {
              // 1. Get Enrollments
              const enrollResponse = await firstValueFrom(
                  this.httpService.get(`http://enrollment-service:8000/v1/students/${studentId}/enrollments`, { headers })
              );
              const enrollments = enrollResponse.data;
              const sectionIds = enrollments.map((e: any) => e.offering_id || e.sectionId).filter(Boolean).join(',');

              if (!sectionIds) {
                  return { partial: false, errors: [], data: [] };
              }

              // 2. Get Sessions
              const sessionsResponse = await firstValueFrom(
                  this.httpService.get(`http://course-service:3000/v1/sessions/list?sectionIds=${sectionIds}`, { headers })
              );
              data = sessionsResponse.data;

          } catch (e) {
              console.error('Error fetching student schedule:', e.message);
              errors.push({ service: 'course/enrollment', reason: e.message || 'Failed to fetch schedule' });
              partial = true;
          }
      } else if (roles.includes('FACULTY')) {
           try {
              const sessionsResponse = await firstValueFrom(
                  this.httpService.get(`http://course-service:3000/v1/sessions`, { headers })
              );
              data = sessionsResponse.data;
          } catch (e) {
               console.error('Error fetching faculty schedule:', e.message);
               errors.push({ service: 'course', reason: e.message || 'Failed to fetch schedule' });
               partial = true;
          }
      } else if (roles.includes('PARENT')) {
           throw new ForbiddenException('Parents must use /parents/children/:id/updates');
      }

      return { partial, errors, data };
  }

  @Get('grades')
  async getGrades(
      @Req() req: Request,
      @CurrentUser() user: AuthenticatedUser,
      @Query('termId') termId?: string,
  ): Promise<AggregationResponse<any>> {
      const tenantId = this.checkTenantContext(req, user);
      const localUser = await this.usersService.findByKeycloakId(user.sub, tenantId);

      const roles = user.realm_access?.roles || user.roles || [];
      const token = req.headers['authorization'];
      const headers = {
          'Authorization': token,
          'X-Tenant-ID': tenantId
      };

      const errors = [];
      let data = null;
      let partial = false;

      if (roles.includes('STUDENT')) {
           const studentId = localUser?.studentId;
           if (!studentId) return { partial: false, errors: [], data: null };

           let url = `http://grades-service:3000/v1/students/${studentId}`;
           if (termId) {
               url += `/term-grades?termId=${termId}`;
           } else {
               url += `/performance`;
           }

           try {
               const response = await firstValueFrom(this.httpService.get(url, { headers }));
               data = response.data;
           } catch (e) {
               console.error('Error fetching grades:', e.message);
               errors.push({ service: 'grades', reason: e.message || 'Failed to fetch grades' });
               partial = true;
           }
      }
      return { partial, errors, data };
  }

  @Get('attendance')
  async getAttendance(
      @Req() req: Request,
      @CurrentUser() user: AuthenticatedUser,
      @Query('termId') termId?: string,
      @Query('courseId') courseId?: string
  ): Promise<AggregationResponse<any>> {
      const tenantId = this.checkTenantContext(req, user);
      const localUser = await this.usersService.findByKeycloakId(user.sub, tenantId);

      const roles = user.realm_access?.roles || user.roles || [];
      const token = req.headers['authorization'];
      const headers = {
          'Authorization': token,
          'X-Tenant-ID': tenantId
      };

      const errors = [];
      let data = null;
      let partial = false;

      if (roles.includes('STUDENT')) {
           const studentId = localUser?.studentId;
           if (!studentId) return { partial: false, errors: [], data: null };

           let url = `http://attendance-service:3000/v1/students/${studentId}/attendance`;
           const params = new URLSearchParams();
           if (termId) params.append('termId', termId);
           if (courseId) params.append('courseId', courseId);
           if ([...params].length > 0) url += `?${params.toString()}`;

           try {
               const response = await firstValueFrom(this.httpService.get(url, { headers }));
               data = response.data;
           } catch (e) {
               console.error('Error fetching attendance:', e.message);
               errors.push({ service: 'attendance', reason: e.message || 'Failed to fetch attendance' });
               partial = true;
           }
      }

      return { partial, errors, data };
  }

  private checkTenantContext(req: Request, user: AuthenticatedUser, requestedTenant?: string): string {
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
