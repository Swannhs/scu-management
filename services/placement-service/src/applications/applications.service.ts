import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApplyJobDto } from './dto/apply-job.dto';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateApplicationStatusDto } from './dto/update-application-status.dto';

@Injectable()
export class ApplicationsService {
  constructor(private readonly prisma: PrismaService) {}

  async apply(tenantId: string, actorId: string, jobPostId: string, data: ApplyJobDto) {
    const jobPost = await this.prisma.jobPost.findFirst({
      where: { id: jobPostId, tenantId, deletedAt: null, isActive: true },
    });
    if (!jobPost) {
      throw new NotFoundException('Job post not found');
    }

    const existing = await this.prisma.application.findFirst({
      where: { tenantId, jobPostId, studentId: actorId, deletedAt: null },
    });
    if (existing) {
      throw new ConflictException('Application already exists');
    }

    return this.prisma.application.create({
      data: {
        tenantId,
        jobPostId,
        studentId: actorId,
        resumeUrl: data.resumeUrl,
        coverLetter: data.coverLetter,
      },
      include: { jobPost: { include: { company: true } } },
    });
  }

  findAll(tenantId: string) {
    return this.prisma.application.findMany({
      where: { tenantId, deletedAt: null },
      include: { jobPost: { include: { company: true } }, offers: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  findMyApplications(tenantId: string, actorId: string) {
    return this.prisma.application.findMany({
      where: { tenantId, studentId: actorId, deletedAt: null },
      include: { jobPost: { include: { company: true } }, offers: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateStatus(tenantId: string, id: string, data: UpdateApplicationStatusDto) {
    const application = await this.prisma.application.findFirst({
      where: { id, tenantId, deletedAt: null },
    });
    if (!application) {
      throw new NotFoundException('Application not found');
    }

    return this.prisma.application.update({
      where: { id },
      data: { status: data.status },
      include: { jobPost: true, offers: true },
    });
  }

  async createOffer(tenantId: string, applicationId: string, data: CreateOfferDto) {
    const application = await this.prisma.application.findFirst({
      where: { id: applicationId, tenantId, deletedAt: null },
    });
    if (!application) {
      throw new NotFoundException('Application not found');
    }

    const offer = await this.prisma.offer.create({
      data: {
        applicationId,
        tenantId,
        ctc: data.ctc,
        currency: data.currency ?? 'USD',
        offerLetterUrl: data.offerLetterUrl,
        isAccepted: null,
      },
      include: { application: { include: { jobPost: true } } },
    });

    await this.prisma.eventOutbox.create({
      data: {
        tenantId,
        eventType: 'placement.offer.created',
        payload: offer,
      },
    });

    return offer;
  }

  async ensureStudentOwnsApplication(tenantId: string, applicationId: string, actorId: string) {
    const application = await this.prisma.application.findFirst({
      where: { id: applicationId, tenantId, deletedAt: null },
    });
    if (!application) {
      throw new NotFoundException('Application not found');
    }
    if (application.studentId !== actorId) {
      throw new ForbiddenException('Not authorized for this application');
    }
    return application;
  }
}
