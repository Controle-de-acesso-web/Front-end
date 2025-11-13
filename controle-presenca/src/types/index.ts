// src/types/index.ts
export type ClassId = 'A' | 'B' | 'C' | 'D';

export type AttendanceStatus = 'P' | 'F' | 'T' | null;

export interface Student {
    id: string;
    name: string;
    registration?: string | null;
    classId: ClassId;
}

export type UserRole = 'admin' | 'teacher';

export interface Session {
    token: string;        // para admin é só um texto fixo; para professor usamos o id
    role: UserRole;
    email: string;
    name?: string;
    classId?: ClassId;
    teacherId?: string;
}
