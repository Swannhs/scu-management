import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TenantId } from '../common/decorators/tenant.decorator';

@Controller('v1/offers')
export class OffersController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('my')
  async findMyOffers(@Body('studentId') studentId: string, @TenantId() tenantId: string) {
    return this.prisma.offer.findMany({
      where: {
        tenantId,
        application: { studentId }
      },
      include: { application: { include: { jobPost: true } } },
    });
  }

  @Patch(':id/accept')
  async acceptOffer(@Param('id') id: string, @TenantId() tenantId: string) {
    const offer = await this.prisma.offer.update({
      where: { id },
      data: { isAccepted: true },
    });

    // Outbox Event
    await this.prisma.eventOutbox.create({
      data: {
        tenantId,
        eventType: 'placement.offer.accepted',
        payload: offer,
      }
    });

    return offer;
  }
}
