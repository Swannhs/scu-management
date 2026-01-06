import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { Roles } from 'nest-keycloak-connect';
import { StudentsService } from './students.service';
import { TenantId } from '../common/decorators/tenant.decorator';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentResponseDto } from './dto/student-response.dto';
import { plainToInstance } from 'class-transformer';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @Roles({ roles: ['realm:TENANT_ADMIN', 'realm:ADMISSION_OFFICER'] })
  async create(@TenantId() tenantId: string, @Body() data: CreateStudentDto) {
    const student = await this.studentsService.create(tenantId, data);
    return plainToInstance(StudentResponseDto, student, {
      excludeExtraneousValues: true,
    });
  }

  @Get()
  @Roles({
    roles: ['realm:TENANT_ADMIN', 'realm:ADMISSION_OFFICER', 'realm:FACULTY'],
  })
  async findAll(
    @TenantId() tenantId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const result = await this.studentsService.findAll(
      tenantId,
      Number(page),
      Number(limit),
    );
    return {
      ...result,
      data: plainToInstance(StudentResponseDto, result.data, {
        excludeExtraneousValues: true,
      }),
    };
  }

  @Get(':id')
  @Roles({
    roles: [
      'realm:TENANT_ADMIN',
      'realm:ADMISSION_OFFICER',
      'realm:FACULTY',
      'realm:STUDENT',
    ],
  })
  async findOne(@TenantId() tenantId: string, @Param('id') id: string) {
    const student = await this.studentsService.findOne(tenantId, id);
    return plainToInstance(StudentResponseDto, student, {
      excludeExtraneousValues: true,
    });
  }

  @Put(':id')
  @Roles({ roles: ['realm:TENANT_ADMIN', 'realm:ADMISSION_OFFICER'] })
  async update(
    @TenantId() tenantId: string,
    @Param('id') id: string,
    @Body() data: UpdateStudentDto,
  ) {
    const student = await this.studentsService.update(tenantId, id, data);
    return plainToInstance(StudentResponseDto, student, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':id')
  @Roles({ roles: ['realm:TENANT_ADMIN'] })
  async remove(@TenantId() tenantId: string, @Param('id') id: string) {
    return this.studentsService.remove(tenantId, id);
  }
}
