export type GatewayAuthMode = 'none' | 'gateway-jwt' | 'passthrough';

export interface ServiceConfig {
  name: string;
  url: string;
  path: string;
  authMode: GatewayAuthMode;
  tenantRequired: boolean;
  allowedRoles?: string[];
}

const serviceUrl = (envKey: string, fallbackUrl: string) =>
  process.env[envKey] || fallbackUrl;

export const services: ServiceConfig[] = [
  {
    name: 'user-service',
    url: serviceUrl('USER_SERVICE_URL', 'http://localhost:3001'),
    path: '/v1/auth',
    authMode: 'none',
    tenantRequired: false,
  },
  {
    name: 'user-service',
    url: serviceUrl('USER_SERVICE_URL', 'http://localhost:3001'),
    path: '/v1/users',
    authMode: 'gateway-jwt',
    tenantRequired: true,
    allowedRoles: ['SUPER_ADMIN', 'ADMIN', 'PRINCIPAL'],
  },

  {
    name: 'course-service',
    url: serviceUrl('COURSE_SERVICE_URL', 'http://course-service:3000'),
    path: '/v1/academic-years',
    authMode: 'passthrough',
    tenantRequired: true,
  },
  {
    name: 'course-service',
    url: serviceUrl('COURSE_SERVICE_URL', 'http://course-service:3000'),
    path: '/v1/terms',
    authMode: 'passthrough',
    tenantRequired: true,
  },
  {
    name: 'course-service',
    url: serviceUrl('COURSE_SERVICE_URL', 'http://course-service:3000'),
    path: '/v1/departments',
    authMode: 'passthrough',
    tenantRequired: true,
  },
  {
    name: 'course-service',
    url: serviceUrl('COURSE_SERVICE_URL', 'http://course-service:3000'),
    path: '/v1/programs',
    authMode: 'passthrough',
    tenantRequired: true,
  },
  {
    name: 'course-service',
    url: serviceUrl('COURSE_SERVICE_URL', 'http://course-service:3000'),
    path: '/v1/rooms',
    authMode: 'passthrough',
    tenantRequired: true,
  },
  {
    name: 'course-service',
    url: serviceUrl('COURSE_SERVICE_URL', 'http://course-service:3000'),
    path: '/v1/courses',
    authMode: 'passthrough',
    tenantRequired: true,
  },
  {
    name: 'course-service',
    url: serviceUrl('COURSE_SERVICE_URL', 'http://course-service:3000'),
    path: '/v1/sections',
    authMode: 'passthrough',
    tenantRequired: true,
  },
  {
    name: 'course-service',
    url: serviceUrl('COURSE_SERVICE_URL', 'http://course-service:3000'),
    path: '/v1/sessions',
    authMode: 'passthrough',
    tenantRequired: true,
  },
  {
    name: 'course-service',
    url: serviceUrl('COURSE_SERVICE_URL', 'http://course-service:3000'),
    path: '/v1/faculty',
    authMode: 'passthrough',
    tenantRequired: true,
  },

  {
    name: 'assessment-service',
    url: serviceUrl('ASSESSMENT_SERVICE_URL', 'http://assessment-service:3000'),
    path: '/exams',
    authMode: 'passthrough',
    tenantRequired: true,
  },
  {
    name: 'assessment-service',
    url: serviceUrl('ASSESSMENT_SERVICE_URL', 'http://assessment-service:3000'),
    path: '/questions',
    authMode: 'passthrough',
    tenantRequired: true,
  },

  {
    name: 'attendance-service',
    url: serviceUrl('ATTENDANCE_SERVICE_URL', 'http://attendance-service:3000'),
    path: '/v1/attendance',
    authMode: 'passthrough',
    tenantRequired: true,
  },

  {
    name: 'grades-service',
    url: serviceUrl('GRADES_SERVICE_URL', 'http://grades-service:3000'),
    path: '/v1/assessments',
    authMode: 'passthrough',
    tenantRequired: true,
  },
  {
    name: 'grades-service',
    url: serviceUrl('GRADES_SERVICE_URL', 'http://grades-service:3000'),
    path: '/v1/final-grades',
    authMode: 'passthrough',
    tenantRequired: true,
  },

  {
    name: 'placement-service',
    url: serviceUrl('PLACEMENT_SERVICE_URL', 'http://placement-service:3000'),
    path: '/v1/companies',
    authMode: 'passthrough',
    tenantRequired: true,
  },
  {
    name: 'placement-service',
    url: serviceUrl('PLACEMENT_SERVICE_URL', 'http://placement-service:3000'),
    path: '/v1/job-posts',
    authMode: 'passthrough',
    tenantRequired: true,
  },
  {
    name: 'placement-service',
    url: serviceUrl('PLACEMENT_SERVICE_URL', 'http://placement-service:3000'),
    path: '/v1/applications',
    authMode: 'passthrough',
    tenantRequired: true,
  },
  {
    name: 'placement-service',
    url: serviceUrl('PLACEMENT_SERVICE_URL', 'http://placement-service:3000'),
    path: '/v1/offers',
    authMode: 'passthrough',
    tenantRequired: true,
  },

  {
    name: 'campus-social-service',
    url: serviceUrl('CAMPUS_SOCIAL_SERVICE_URL', 'http://campus-social-service:3000'),
    path: '/v1/profiles',
    authMode: 'passthrough',
    tenantRequired: true,
  },
  {
    name: 'campus-social-service',
    url: serviceUrl('CAMPUS_SOCIAL_SERVICE_URL', 'http://campus-social-service:3000'),
    path: '/v1/friends',
    authMode: 'passthrough',
    tenantRequired: true,
  },
  {
    name: 'campus-social-service',
    url: serviceUrl('CAMPUS_SOCIAL_SERVICE_URL', 'http://campus-social-service:3000'),
    path: '/v1/groups',
    authMode: 'passthrough',
    tenantRequired: true,
  },
  {
    name: 'campus-social-service',
    url: serviceUrl('CAMPUS_SOCIAL_SERVICE_URL', 'http://campus-social-service:3000'),
    path: '/v1/feed',
    authMode: 'passthrough',
    tenantRequired: true,
  },
  {
    name: 'campus-social-service',
    url: serviceUrl('CAMPUS_SOCIAL_SERVICE_URL', 'http://campus-social-service:3000'),
    path: '/v1/posts',
    authMode: 'passthrough',
    tenantRequired: true,
  },
  {
    name: 'campus-social-service',
    url: serviceUrl('CAMPUS_SOCIAL_SERVICE_URL', 'http://campus-social-service:3000'),
    path: '/v1/comments',
    authMode: 'passthrough',
    tenantRequired: true,
  },
  {
    name: 'campus-social-service',
    url: serviceUrl('CAMPUS_SOCIAL_SERVICE_URL', 'http://campus-social-service:3000'),
    path: '/v1/reports',
    authMode: 'passthrough',
    tenantRequired: true,
  },
  {
    name: 'campus-social-service',
    url: serviceUrl('CAMPUS_SOCIAL_SERVICE_URL', 'http://campus-social-service:3000'),
    path: '/v1/moderation',
    authMode: 'passthrough',
    tenantRequired: true,
  },
  {
    name: 'campus-social-service',
    url: serviceUrl('CAMPUS_SOCIAL_SERVICE_URL', 'http://campus-social-service:3000'),
    path: '/v1/conversations',
    authMode: 'passthrough',
    tenantRequired: true,
  },
  {
    name: 'campus-social-service',
    url: serviceUrl('CAMPUS_SOCIAL_SERVICE_URL', 'http://campus-social-service:3000'),
    path: '/v1/chats',
    authMode: 'passthrough',
    tenantRequired: true,
  },
  {
    name: 'campus-social-service',
    url: serviceUrl('CAMPUS_SOCIAL_SERVICE_URL', 'http://campus-social-service:3000'),
    path: '/v1/calls',
    authMode: 'passthrough',
    tenantRequired: true,
  },
  {
    name: 'campus-social-service',
    url: serviceUrl('CAMPUS_SOCIAL_SERVICE_URL', 'http://campus-social-service:3000'),
    path: '/v1/notifications',
    authMode: 'passthrough',
    tenantRequired: true,
  },
  {
    name: 'campus-social-service',
    url: serviceUrl('CAMPUS_SOCIAL_SERVICE_URL', 'http://campus-social-service:3000'),
    path: '/v1/directory',
    authMode: 'passthrough',
    tenantRequired: true,
  },
  {
    name: 'campus-social-service',
    url: serviceUrl('CAMPUS_SOCIAL_SERVICE_URL', 'http://campus-social-service:3000'),
    path: '/v1/media',
    authMode: 'passthrough',
    tenantRequired: true,
  },
  {
    name: 'campus-social-service',
    url: serviceUrl('CAMPUS_SOCIAL_SERVICE_URL', 'http://campus-social-service:3000'),
    path: '/v1/events',
    authMode: 'passthrough',
    tenantRequired: true,
  },

  {
    name: 'document-service',
    url: serviceUrl('DOCUMENT_SERVICE_URL', 'http://document-service:3000'),
    path: '/v1/files',
    authMode: 'passthrough',
    tenantRequired: true,
  },
];

const serviceByName = new Map<string, ServiceConfig>();
for (const service of services) {
  if (!serviceByName.has(service.name)) {
    serviceByName.set(service.name, service);
  }
}

const sortedServices = [...services].sort((a, b) => b.path.length - a.path.length);

export function getServiceConfig(path: string): ServiceConfig | undefined {
  if (path.startsWith('/services/')) {
    const [, , serviceName] = path.split('/');
    return getServiceByName(serviceName);
  }

  return sortedServices.find((service) => path.startsWith(service.path));
}

export function getServiceByName(serviceName: string): ServiceConfig | undefined {
  return serviceByName.get(serviceName);
}
