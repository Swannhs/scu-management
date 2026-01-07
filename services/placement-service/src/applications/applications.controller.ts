import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TenantId } from '../common/decorators/tenant.decorator';
import { ApplicationStatus } from '@prisma/client';

@Controller('v1/applications')
export class ApplicationsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('my')
  async findMyApplications(@Body('studentId') studentId: string, @TenantId() tenantId: string) {
    // In reality, studentId comes from User Decorator
    return this.prisma.application.findMany({
      where: { studentId, tenantId },
      include: { jobPost: { include: { company: true } } },
    });
  }

  @Get()
  async findAll(@TenantId() tenantId: string) {
    return this.prisma.application.findMany({
      where: { tenantId },
      include: { jobPost: true },
    });
  }

  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body('status') status: ApplicationStatus, @TenantId() tenantId: string) {
    return this.prisma.application.update({
      where: { id },
      data: { status },
    });
  }

  @Post(':id/offer')
  async createOffer(@Param('id') applicationId: string, @Body() data: any, @TenantId() tenantId: string) {
    const offer = await this.prisma.offer.create({
      data: {
        applicationId,
        tenantId,
        ctc: data.ctc,
        currency: data.currency,
        offerLetterUrl: data.offerLetterUrl,
        isAccepted: null,
      },
    });

    // Outbox Event
    await this.prisma.eventOutbox.create({
      data: {
        tenantId,
        eventType: 'placement.offer.created',
        payload: offer,
      }
    });

    return offer;
  }
}
