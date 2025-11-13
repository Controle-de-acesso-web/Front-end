import { api } from './client';
import type { AttendanceStatus, ClassId, Student } from '@/types';

type AttendanceDto = {
    id: string;
    date: string;
    status: AttendanceStatus;
    student: { id: string }; // vem aninhado no JSON do backend
};

export async function fetchStudentsByClass(classId: ClassId) {
    // GET /teacher/students?classId=A
    return api.get<Student[]>(`/teacher/students?classId=${classId}`);
}

export async function fetchAttendanceForDate(classId: ClassId, dateISO: string) {
    // GET /teacher/attendance?classId=A&date=2025-11-13
    const data = await api.get<AttendanceDto[]>(
        `/teacher/attendance?classId=${classId}&date=${encodeURIComponent(dateISO)}`
    );

    // converte para o formato que a tela espera: { studentId, status }
    return data.map(a => ({
        studentId: a.student.id,
        status: a.status,
    }));
}

export async function saveAttendanceBulk(
    classId: ClassId,
    dateISO: string,
    items: Array<{ studentId: string; status: AttendanceStatus }>
) {
    // PUT /teacher/attendance
    await api.put<void>('/teacher/attendance', {
        classId,
        date: dateISO,
        items,
    });
}
