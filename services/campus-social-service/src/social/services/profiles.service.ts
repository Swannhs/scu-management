import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateProfileDto } from '../dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(tenantId: string, userId: string) {
    const profile = await this.prisma.profilePublic.findUnique({
      where: {
        tenantId_userId: {
          tenantId,
          userId,
        },
      },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return profile;
  }

  async upsertMyProfile(tenantId: string, actorId: string, dto: UpdateProfileDto) {
    if (!actorId) {
      throw new ForbiddenException('Missing actor');
    }

    return this.prisma.profilePublic.upsert({
      where: {
        tenantId_userId: {
          tenantId,
          userId: actorId,
        },
      },
      update: {
        headline: dto.headline,
        bio: dto.bio,
        avatarFileId: dto.avatarFileId,
        coverFileId: dto.coverFileId,
        privacy: dto.privacy,
      },
      create: {
        tenantId,
        userId: actorId,
        headline: dto.headline,
        bio: dto.bio,
        avatarFileId: dto.avatarFileId,
        coverFileId: dto.coverFileId,
        privacy: dto.privacy,
      },
    });
  }

  async createDefaultProfile(tenantId: string, userId: string) {
    return this.prisma.profilePublic.upsert({
      where: {
        tenantId_userId: {
          tenantId,
          userId,
        },
      },
      update: {},
      create: {
        tenantId,
        userId,
      },
    });
  }
}
