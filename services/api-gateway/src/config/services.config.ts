export interface ServiceConfig {
  name: string;
  url: string;
  path: string;
  requireAuth: boolean;
  allowedRoles?: string[];
}

export const services: ServiceConfig[] = [
  {
    name: 'user-service',
    url: process.env.USER_SERVICE_URL || 'http://localhost:3001',
    path: '/v1/auth',
    requireAuth: false,
  },
  {
    name: 'user-service',
    url: process.env.USER_SERVICE_URL || 'http://localhost:3001',
    path: '/v1/users',
    requireAuth: true,
    allowedRoles: ['SUPER_ADMIN', 'ADMIN', 'PRINCIPAL'],
  },
  {
    name: 'academic-service',
    url: process.env.ACADEMIC_SERVICE_URL || 'http://localhost:3002',
    path: '/v1/academic-years',
    requireAuth: true,
  },
  {
    name: 'academic-service',
    url: process.env.ACADEMIC_SERVICE_URL || 'http://localhost:3002',
    path: '/v1/courses',
    requireAuth: true,
  },
  {
    name: 'academic-service',
    url: process.env.ACADEMIC_SERVICE_URL || 'http://localhost:3002',
    path: '/v1/subjects',
    requireAuth: true,
  },
  {
    name: 'academic-service',
    url: process.env.ACADEMIC_SERVICE_URL || 'http://localhost:3002',
    path: '/v1/classes',
    requireAuth: true,
  },
  {
    name: 'academic-service',
    url: process.env.ACADEMIC_SERVICE_URL || 'http://localhost:3002',
    path: '/v1/teachers',
    requireAuth: true,
  },
  {
    name: 'academic-service',
    url: process.env.ACADEMIC_SERVICE_URL || 'http://localhost:3002',
    path: '/v1/timetables',
    requireAuth: true,
  },
  {
    name: 'student-service',
    url: process.env.STUDENT_SERVICE_URL || 'http://localhost:3003',
    path: '/v1/students',
    requireAuth: true,
  },
  {
    name: 'attendance-service',
    url: process.env.ATTENDANCE_SERVICE_URL || 'http://localhost:3004',
    path: '/v1/attendance',
    requireAuth: true,
  },
  {
    name: 'examination-service',
    url: process.env.EXAMINATION_SERVICE_URL || 'http://localhost:3005',
    path: '/v1/exam-types',
    requireAuth: true,
  },
  {
    name: 'examination-service',
    url: process.env.EXAMINATION_SERVICE_URL || 'http://localhost:3005',
    path: '/v1/exams',
    requireAuth: true,
  },
  {
    name: 'examination-service',
    url: process.env.EXAMINATION_SERVICE_URL || 'http://localhost:3005',
    path: '/v1/marks',
    requireAuth: true,
  },
  {
    name: 'examination-service',
    url: process.env.EXAMINATION_SERVICE_URL || 'http://localhost:3005',
    path: '/v1/results',
    requireAuth: true,
  },
  {
    name: 'examination-service',
    url: process.env.EXAMINATION_SERVICE_URL || 'http://localhost:3005',
    path: '/v1/transcripts',
    requireAuth: true,
  },
  {
    name: 'fee-service',
    url: process.env.FEE_SERVICE_URL || 'http://localhost:3006',
    path: '/v1/fee-types',
    requireAuth: true,
  },
  {
    name: 'fee-service',
    url: process.env.FEE_SERVICE_URL || 'http://localhost:3006',
    path: '/v1/fee-structures',
    requireAuth: true,
  },
  {
    name: 'fee-service',
    url: process.env.FEE_SERVICE_URL || 'http://localhost:3006',
    path: '/v1/invoices',
    requireAuth: true,
  },
  {
    name: 'fee-service',
    url: process.env.FEE_SERVICE_URL || 'http://localhost:3006',
    path: '/v1/payments',
    requireAuth: true,
  },
  {
    name: 'fee-service',
    url: process.env.FEE_SERVICE_URL || 'http://localhost:3006',
    path: '/v1/fee-reports',
    requireAuth: true,
    allowedRoles: ['SUPER_ADMIN', 'ADMIN', 'PRINCIPAL', 'ACCOUNTANT'],
  },
];

export function getServiceConfig(path: string): ServiceConfig | undefined {
  return services.find((s) => path.startsWith(s.path));
}
