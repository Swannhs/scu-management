import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApplicationsService } from '../applications/applications.service';

@Injectable()
export class OffersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly applicationsService: ApplicationsService,
  ) {}

  findMyOffers(tenantId: string, actorId: string) {
    return this.prisma.offer.findMany({
      where: {
        tenantId,
        deletedAt: null,
        application: {
          tenantId,
          studentId: actorId,
          deletedAt: null,
        },
      },
      include: { application: { include: { jobPost: { include: { company: true } } } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async acceptOffer(tenantId: string, actorId: string, id: string) {
    const offer = await this.prisma.offer.findFirst({
      where: { id, tenantId, deletedAt: null },
      include: { application: true },
    });
    if (!offer) {
      throw new NotFoundException('Offer not found');
    }

    if (offer.application.studentId !== actorId) {
      throw new ForbiddenException('Not authorized for this offer');
    }

    const updated = await this.prisma.offer.update({
      where: { id },
      data: { isAccepted: true },
      include: { application: { include: { jobPost: true } } },
    });

    await this.prisma.eventOutbox.create({
      data: {
        tenantId,
        eventType: 'placement.offer.accepted',
        payload: updated,
      },
    });

    return updated;
  }
}
