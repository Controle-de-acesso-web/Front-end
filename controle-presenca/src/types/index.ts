// src/types/index.ts
export type ClassId = 'A' | 'B' | 'C' | 'D';

export type AttendanceStatus = 'P' | 'F' | 'T' | null;

export type UserRole = 'admin' | 'teacher';

export interface Student {
    id: string;
    name: string;
    registration?: string;
    classId: ClassId;
}

export interface AttendanceItem {
    studentId: string;
    status: AttendanceStatus;
}

export interface Session {
    token: string;
    role: UserRole;
    email: string;
    name?: string;
    /** turma do professor (apenas quando role === 'teacher') */
    classId?: ClassId;
}
