import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to add Tenant ID and Auth token
api.interceptors.request.use((config) => {
    // In a real scenario, we'll get these from a state management or context
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const tenantId = typeof window !== 'undefined' ? localStorage.getItem('tenantId') : null;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    if (tenantId) {
        config.headers['X-Tenant-ID'] = tenantId;
    }

    return config;
});

export const StudentService = {
    getAll: () => api.get('/students'),
    create: (data: any) => api.post('/students', data),
    getOne: (id: string) => api.get(`/students/${id}`),
};

export const CourseService = {
    getPrograms: () => api.get('/courses/programs'),
    getOfferings: (levelId: string) => api.get(`/courses/academic-ops/offerings/${levelId}`),
};

export const FinanceService = {
    getInvoices: () => api.get('/finance/invoices'),
    getStudentInvoices: (id: string) => api.get(`/finance/invoices/student/${id}`),
};

export const AdminService = {
    getTenants: () => api.get('/admin/tenants'),
    resolveDomain: (hostname: string) => api.get(`/admin/resolve-domain?hostname=${hostname}`),
};

export default api;
