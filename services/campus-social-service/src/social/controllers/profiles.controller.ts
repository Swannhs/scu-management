import { Body, Controller, Get, Param, Put, Req } from '@nestjs/common';
import { Roles } from 'nest-keycloak-connect';
import { Request } from 'express';
import { TenantContextParam } from '../../common/tenant-context.decorator';
import { TenantContext } from '../../common/tenant-context';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { ProfilesService } from '../services/profiles.service';

@Controller('v1/profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get('me')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async getMe(@TenantContextParam() tenantContext: TenantContext, @Req() req: Request) {
    const userId = req.user?.sub as string;
    return this.profilesService.getProfile(tenantContext.effectiveTenantId, userId);
  }

  @Put('me')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async updateMe(
    @TenantContextParam() tenantContext: TenantContext,
    @Req() req: Request,
    @Body() dto: UpdateProfileDto,
  ) {
    const userId = req.user?.sub as string;
    return this.profilesService.upsertMyProfile(tenantContext.effectiveTenantId, userId, dto);
  }

  @Get(':userId')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  async getByUser(
    @TenantContextParam() tenantContext: TenantContext,
    @Param('userId') userId: string,
  ) {
    return this.profilesService.getProfile(tenantContext.effectiveTenantId, userId);
  }
}
