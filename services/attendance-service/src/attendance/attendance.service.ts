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
      throw new NotFoundException('NOT_FOUND');
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

  async getStudentSummary(tenantId: string, studentId: string) {
    const records = await this.prisma.attendanceRecord.findMany({
      where: {
        tenantId,
        studentId,
        session: { deletedAt: null },
      },
      include: {
        session: {
          select: { courseOfferingId: true, deletedAt: true },
        },
      },
    });

    const overall = {
      present: 0,
      absent: 0,
      late: 0,
      excused: 0,
      total: 0,
      percentage: 0,
    };

    const byCourseMap = new Map<string, typeof overall>();

    for (const r of records) {
      if (!r.session) continue;

      const status = r.status;
      const courseId = r.session.courseOfferingId;

      if (!byCourseMap.has(courseId)) {
        byCourseMap.set(courseId, { present: 0, absent: 0, late: 0, excused: 0, total: 0, percentage: 0 });
      }
      const courseStats = byCourseMap.get(courseId)!;

      // Update counts
      if (status === 'PRESENT') {
        overall.present++;
        courseStats.present++;
      } else if (status === 'ABSENT') {
        overall.absent++;
        courseStats.absent++;
      } else if (status === 'LATE') {
        overall.late++;
        courseStats.late++;
      } else if (status === 'EXCUSED') {
        overall.excused++;
        courseStats.excused++;
      }

      if (['PRESENT', 'ABSENT', 'LATE'].includes(status)) {
        overall.total++;
        courseStats.total++;
      }
    }

    const calculatePercentage = (stats: typeof overall) => {
       if (stats.total === 0) return 0;
       return ((stats.present + stats.late) / stats.total) * 100;
    };

    overall.percentage = calculatePercentage(overall);

    const byCourse = Array.from(byCourseMap.entries()).map(([courseId, stats]) => ({
      courseId,
      courseCode: courseId, // Placeholder as we don't have course-service access here
      present: stats.present,
      absent: stats.absent,
      late: stats.late,
      percentage: calculatePercentage(stats)
    }));

    return {
      studentId,
      overall: {
        present: overall.present,
        absent: overall.absent,
        late: overall.late,
        excused: overall.excused,
        total: overall.total,
        percentage: overall.percentage
      },
      byCourse
    };
  }
}
