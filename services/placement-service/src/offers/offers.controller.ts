import { Controller, Get, Param, Patch } from '@nestjs/common';
import { Roles } from 'nest-keycloak-connect';
import { TenantContextParam } from '../common/tenant-context.decorator';
import type { TenantContext } from '../common/tenant-context';
import { OffersService } from './offers.service';

@Controller('v1/offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Get('my')
  @Roles({ roles: ['STUDENT'] })
  async findMyOffers(@TenantContextParam() tenantContext: TenantContext) {
    return this.offersService.findMyOffers(
      tenantContext.effectiveTenantId,
      tenantContext.actorId,
    );
  }

  @Patch(':id/accept')
  @Roles({ roles: ['STUDENT'] })
  async acceptOffer(
    @Param('id') id: string,
    @TenantContextParam() tenantContext: TenantContext,
  ) {
    return this.offersService.acceptOffer(
      tenantContext.effectiveTenantId,
      tenantContext.actorId,
      id,
    );
  }
}
