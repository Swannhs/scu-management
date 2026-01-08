import { Controller, Get, Put, Body, Param, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TenantId } from '../common/decorators/tenant.decorator';
import { User } from '../common/decorators/user.decorator';

@Controller('v1/profiles')
export class ProfilesController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('me')
  async getMe(@User() user: any, @TenantId() tenantId: string) {
    const profile = await this.prisma.publicProfile.findUnique({
      where: { tenantId_userId: { tenantId, userId: user.sub } },
    });
    if (!profile) throw new NotFoundException('Profile not found');
    return profile;
  }

  @Put('me')
  async updateMe(@User() user: any, @Body() data: any, @TenantId() tenantId: string) {
    return this.prisma.publicProfile.upsert({
      where: { tenantId_userId: { tenantId, userId: user.sub } },
      update: {
        headline: data.headline,
        bio: data.bio,
        avatarFileId: data.avatarFileId,
        coverFileId: data.coverFileId,
        privacy: data.privacy,
      },
      create: {
        tenantId,
        userId: user.sub,
        headline: data.headline,
        bio: data.bio,
        avatarFileId: data.avatarFileId,
        coverFileId: data.coverFileId,
        privacy: data.privacy,
      },
    });
  }

  @Get(':userId')
  async getProfile(@Param('userId') userId: string, @TenantId() tenantId: string) {
    const profile = await this.prisma.publicProfile.findUnique({
        where: { tenantId_userId: { tenantId, userId } },
    });
    // Check privacy? For public profiles it's usually visible.
    if (!profile) throw new NotFoundException('Profile not found');
    return profile;
  }
}
