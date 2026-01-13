import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAttendanceSessionDto } from './dto/create-attendance-session.dto';
import { MarkAttendanceDto } from './dto/mark-attendance.dto';
import { AttendanceStatus } from '@prisma/client';

@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) {}

  async createSession(tenantId: string, takenById: string | undefined, dto: CreateAttendanceSessionDto) {
    return this.prisma.attendanceSession.create({
      data: {
        tenantId,
        courseOfferingId: dto.sectionId,
        termId: dto.termId,
        date: new Date(dto.date),
        startTime: dto.startTime ? new Date(dto.startTime) : undefined,
        endTime: dto.endTime ? new Date(dto.endTime) : undefined,
        takenById,
      },
    });
  }

  async markAttendance(tenantId: string, sessionId: string, dto: MarkAttendanceDto) {
    const session = await this.prisma.attendanceSession.findFirst({
      where: { id: sessionId, tenantId },
    });
    if (!session) {
      throw new NotFoundException({
        code: 'NOT_FOUND',
        message: 'Attendance session not found',
        details: null,
      });
    }

    const upserts = dto.records.map((record) =>
      this.prisma.attendanceRecord.upsert({
        where: {
          attendanceSessionId_studentId: {
            attendanceSessionId: sessionId,
            studentId: record.studentId,
          },
        },
        update: {
          status: record.status as AttendanceStatus,
          remarks: record.remarks,
        },
        create: {
          tenantId,
          attendanceSessionId: sessionId,
          studentId: record.studentId,
          status: record.status as AttendanceStatus,
          remarks: record.remarks,
        },
      }),
    );

    await this.prisma.$transaction(upserts);
    return this.prisma.attendanceRecord.findMany({
      where: { tenantId, attendanceSessionId: sessionId },
    });
  }

  getStudentAttendance(tenantId: string, studentId: string, termId?: string) {
    return this.prisma.attendanceRecord.findMany({
      where: {
        tenantId,
        studentId,
        ...(termId ? { session: { termId } } : {}),
      },
      include: { session: true },
    });
  }

  getSectionAttendance(tenantId: string, sectionId: string, from?: string, to?: string) {
    const fromDate = from ? new Date(from) : undefined;
    const toDate = to ? new Date(to) : undefined;

    return this.prisma.attendanceSession.findMany({
      where: {
        tenantId,
        courseOfferingId: sectionId,
        ...(fromDate || toDate
          ? {
              date: {
                ...(fromDate ? { gte: fromDate } : {}),
                ...(toDate ? { lte: toDate } : {}),
              },
            }
          : {}),
      },
      include: { records: true },
    });
  }
}
