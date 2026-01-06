import {
  IsString,
  IsOptional,
  IsEmail,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { StudentStatus } from '@prisma/client';

export class UpdateStudentDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  middleName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsDateString()
  @IsOptional()
  dateOfBirth?: string;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsString()
  @IsOptional()
  bloodGroup?: string;

  @IsString()
  @IsOptional()
  nationality?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsEnum(StudentStatus)
  @IsOptional()
  status?: StudentStatus;

  @IsString()
  @IsOptional()
  parentName?: string;
}
