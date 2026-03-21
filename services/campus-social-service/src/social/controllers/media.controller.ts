import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { Roles } from 'nest-keycloak-connect';
import { TenantContextParam } from '../../common/tenant-context.decorator';
import type { TenantContext } from '../../common/tenant-context';
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
    return this.mediaService.upload(tenantContext.effectiveTenantId, req.user?.sub as string, dto, {
      authorization: req.headers.authorization as string | undefined,
      tenantId: tenantContext.effectiveTenantId,
      userId: req.user?.sub as string | undefined,
    });
  }
}
