import {
  IsString,
  IsOptional,
  IsEmail,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { StudentStatus } from '@prisma/client';

export class CreateStudentDto {
  @IsString()
  studentId: string;

  @IsString()
  firstName: string;

  @IsString()
  @IsOptional()
  middleName?: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

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

  // Add other fields as necessary from the schema
  @IsString()
  @IsOptional()
  parentName?: string;
}
