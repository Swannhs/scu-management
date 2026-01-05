import { Role } from '@prisma/client';
import { IsEmail, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

export class OnboardUserDto {
  @IsEmail()
  email!: string;

  @IsUUID()
  keycloakId!: string;

  @IsEnum(Role)
  role!: Role;

  /**
   * Only global admins may specify tenantId. Tenant admins are restricted to
   * their own tenant (overridden from JWT tenant_id claim).
   */
  @IsOptional()
  @IsString()
  tenantId?: string;
}
