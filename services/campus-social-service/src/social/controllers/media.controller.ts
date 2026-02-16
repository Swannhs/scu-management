import { Body, Controller, Post, Req } from '@nestjs/common';
import { Roles } from 'nest-keycloak-connect';
import { Request } from 'express';
import { TenantContextParam } from '../../common/tenant-context.decorator';
import { TenantContext } from '../../common/tenant-context';
import { Body, Controller, Post } from '@nestjs/common';
import { Roles } from 'nest-keycloak-connect';
import { UploadMediaDto } from '../dto/upload-media.dto';
import { MediaService } from '../services/media.service';

@Controller('v1/media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('upload')
  @Roles({ roles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN'] })
  upload(
    @TenantContextParam() tenantContext: TenantContext,
    @Req() req: Request,
    @Body() dto: UploadMediaDto,
  ) {
    return this.mediaService.upload(tenantContext.effectiveTenantId, req.user?.sub as string, dto);
  upload(@Body() dto: UploadMediaDto) {
    return this.mediaService.upload(dto);
  }
}
