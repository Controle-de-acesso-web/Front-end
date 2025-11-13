// src/api/admin.ts
import { api } from './client';
import type { ClassId, Student } from '@/types';

// "admin:admin123" em Base64
const ADMIN_AUTH_HEADER = {
    Authorization: 'Basic YWRtaW46YWRtaW4xMjM=',
};

export interface NewTeacherPayload {
    name: string;
    email: string;
    password: string;
    classId: ClassId;
}

export interface NewStudentPayload {
    name: string;
    registration?: string;
    classId: ClassId;
}

export async function createTeacher(payload: NewTeacherPayload) {
    // POST /admin/teachers
    return api.post('/admin/teachers', payload, ADMIN_AUTH_HEADER);
}

export async function createStudent(payload: NewStudentPayload) {
    // POST /admin/students
    return api.post<Student>('/admin/students', payload, ADMIN_AUTH_HEADER);
}
