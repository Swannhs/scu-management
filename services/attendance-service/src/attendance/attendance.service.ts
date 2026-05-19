import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAttendanceMarkDto } from './dto/create-attendance-mark.dto';
import { BulkAttendanceMarksDto } from './dto/bulk-attendance-marks.dto';
import { UpdateAttendanceMarkDto } from './dto/update-attendance-mark.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAttendanceSessionDto } from './dto/create-attendance-session.dto';
import { MarkAttendanceDto } from './dto/mark-attendance.dto';
import { UpdateAttendanceSessionDto } from './dto/update-attendance-session.dto';
import { AttendanceStatus } from '@prisma/client';

@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) {}

  listSessions(tenantId: string, sectionId?: string) {
    return this.prisma.attendanceSession.findMany({
      where: {
        tenantId,
        deletedAt: null,
        ...(sectionId ? { courseOfferingId: sectionId } : {}),
      },
      orderBy: { date: 'desc' },
    });
  }

  async getSessionById(tenantId: string, id: string) {
    const session = await this.prisma.attendanceSession.findFirst({
      where: { tenantId, id, deletedAt: null },
    });

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    return session;
  }

  async createSession(tenantId: string, takenById: string | undefined, dto: CreateAttendanceSessionDto) {
    const duplicate = await this.prisma.attendanceSession.findFirst({
      where: {
        tenantId,
        courseOfferingId: dto.sectionId,
        date: new Date(dto.date),
        startTime: dto.startTime ? new Date(dto.startTime) : null,
        endTime: dto.endTime ? new Date(dto.endTime) : null,
        deletedAt: null,
      },
      select: { id: true },
    });

    if (duplicate) {
      throw new ConflictException('Attendance session already exists for the same section and time');
    }

    return this.prisma.attendanceSession.create({
      data: {
        tenantId,
        courseOfferingId: dto.sectionId,
        termId: dto.termId,
        date: new Date(dto.date),
        startTime: dto.startTime ? new Date(dto.startTime) : undefined,
        endTime: dto.endTime ? new Date(dto.endTime) : undefined,
        status: dto.status ?? 'draft',
        takenById,
      },
    });
  }

  async updateSession(
    tenantId: string,
    id: string,
    dto: UpdateAttendanceSessionDto,
  ) {
    const existing = await this.getSessionById(tenantId, id);

    if (existing.status === 'closed') {
      throw new BadRequestException('Closed attendance session cannot be modified');
    }

    const nextDate = dto.date ? new Date(dto.date) : existing.date;
    const nextStart = dto.startTime ? new Date(dto.startTime) : existing.startTime;
    const nextEnd = dto.endTime ? new Date(dto.endTime) : existing.endTime;

    const duplicate = await this.prisma.attendanceSession.findFirst({
      where: {
        tenantId,
        id: { not: id },
        courseOfferingId: existing.courseOfferingId,
        date: nextDate,
        startTime: nextStart,
        endTime: nextEnd,
        deletedAt: null,
      },
      select: { id: true },
    });

    if (duplicate) {
      throw new ConflictException('Attendance session already exists for the same section and time');
    }

    return this.prisma.attendanceSession.update({
      where: { id },
      data: {
        ...(dto.date !== undefined ? { date: new Date(dto.date) } : {}),
        ...(dto.startTime !== undefined ? { startTime: new Date(dto.startTime) } : {}),
        ...(dto.endTime !== undefined ? { endTime: new Date(dto.endTime) } : {}),
        ...(dto.status !== undefined ? { status: dto.status } : {}),
      },
    });
  }

  async deleteSession(tenantId: string, id: string) {
    const existing = await this.getSessionById(tenantId, id);

    if (existing.status === 'closed') {
      throw new BadRequestException('Closed attendance session cannot be deleted');
    }

    return this.prisma.attendanceSession.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async createMark(tenantId: string, sessionId: string, dto: CreateAttendanceMarkDto) {
    const session = await this.prisma.attendanceSession.findFirst({
      where: { id: sessionId, tenantId, deletedAt: null },
    });

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    if (session.status === 'closed') {
      throw new BadRequestException('Cannot mark attendance for closed session');
    }

    const exists = await this.prisma.attendanceRecord.findFirst({
      where: {
        tenantId,
        attendanceSessionId: sessionId,
        studentId: dto.studentId,
        deletedAt: null,
      },
      select: { id: true },
    });

    if (exists) {
      throw new ConflictException('Attendance mark already exists for this student and session');
    }

    return this.prisma.attendanceRecord.create({
      data: {
        tenantId,
        attendanceSessionId: sessionId,
        studentId: dto.studentId,
        status: dto.status.toUpperCase() as AttendanceStatus,
        remarks: dto.remarks,
      },
    });
  }

  async createBulkMarks(tenantId: string, sessionId: string, dto: BulkAttendanceMarksDto) {
    const session = await this.prisma.attendanceSession.findFirst({
      where: { id: sessionId, tenantId, deletedAt: null },
    });

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    if (session.status === 'closed') {
      throw new BadRequestException('Cannot mark attendance for closed session');
    }

    const studentIds = dto.marks.map((m) => m.studentId);

    const duplicatesInPayload = new Set<string>();
    const seen = new Set<string>();
    for (const studentId of studentIds) {
      if (seen.has(studentId)) duplicatesInPayload.add(studentId);
      seen.add(studentId);
    }
    if (duplicatesInPayload.size > 0) {
      throw new ConflictException('Duplicate student entries in bulk marks payload');
    }

    const existing = await this.prisma.attendanceRecord.findMany({
      where: {
        tenantId,
        attendanceSessionId: sessionId,
        studentId: { in: studentIds },
        deletedAt: null,
      },
      select: { studentId: true },
    });

    if (existing.length > 0) {
      throw new ConflictException('One or more attendance marks already exist for this session');
    }

    await this.prisma.attendanceRecord.createMany({
      data: dto.marks.map((mark) => ({
        tenantId,
        attendanceSessionId: sessionId,
        studentId: mark.studentId,
        status: mark.status.toUpperCase() as AttendanceStatus,
        remarks: mark.remarks,
      })),
    });

    return this.prisma.attendanceRecord.findMany({
      where: { tenantId, attendanceSessionId: sessionId, deletedAt: null },
      orderBy: { createdAt: 'asc' },
    });
  }

  async updateMark(tenantId: string, markId: string, dto: UpdateAttendanceMarkDto) {
    const mark = await this.prisma.attendanceRecord.findFirst({
      where: { id: markId, tenantId, deletedAt: null },
      include: { session: true },
    });

    if (!mark) {
      throw new NotFoundException('Mark not found');
    }

    if (mark.session?.status === 'closed') {
      throw new BadRequestException('Cannot update attendance mark for closed session');
    }

    return this.prisma.attendanceRecord.update({
      where: { id: markId },
      data: {
        ...(dto.status !== undefined
          ? { status: dto.status.toUpperCase() as AttendanceStatus }
          : {}),
        ...(dto.remarks !== undefined ? { remarks: dto.remarks } : {}),
      },
    });
  }

  async getSessionMarks(tenantId: string, sessionId: string) {
    const session = await this.prisma.attendanceSession.findFirst({
      where: { id: sessionId, tenantId, deletedAt: null },
      select: { id: true },
    });

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    return this.prisma.attendanceRecord.findMany({
      where: { tenantId, attendanceSessionId: sessionId, deletedAt: null },
      orderBy: { createdAt: 'asc' },
    });
  }

  async markAttendance(tenantId: string, sessionId: string, dto: MarkAttendanceDto) {
    return this.createBulkMarks(tenantId, sessionId, {
      marks: dto.records.map((record) => ({
        studentId: record.studentId,
        status: record.status.toLowerCase(),
        remarks: record.remarks,
      })),
    });
  }

  getStudentAttendance(tenantId: string, studentId: string, termId?: string, courseId?: string) {
    return this.prisma.attendanceRecord.findMany({
      where: {
        tenantId,
        studentId,
        deletedAt: null,
        session: {
          deletedAt: null,
          ...(termId ? { termId } : {}),
          ...(courseId ? { courseOfferingId: courseId } : {}),
        },
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
        deletedAt: null,
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
        deletedAt: null,
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
      courseCode: courseId,
      present: stats.present,
      absent: stats.absent,
      late: stats.late,
      percentage: calculatePercentage(stats),
    }));

    return {
      studentId,
      overall: {
        present: overall.present,
        absent: overall.absent,
        late: overall.late,
        excused: overall.excused,
        total: overall.total,
        percentage: overall.percentage,
      },
      byCourse,
    };
  }
}
