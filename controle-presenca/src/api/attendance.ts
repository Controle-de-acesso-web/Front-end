import { api } from './client';
import type { AttendanceStatus, ClassId, Student } from '@/types';

type AttendanceDTO = { studentId: string; status: AttendanceStatus | null };

export async function fetchStudentsByClass(classId: ClassId) {
    return api.get<Student[]>(`/teacher/students?classId=${classId}`);
}

export async function fetchAttendanceForDate(classId: ClassId, dateISO: string) {
    return api.get<AttendanceDTO[]>(
        `/teacher/attendance?classId=${classId}&date=${encodeURIComponent(dateISO)}`
    );
}

export async function saveAttendanceBulk(
    classId: ClassId,
    dateISO: string,
    items: AttendanceDTO[]
) {
    await api.put<void>('/teacher/attendance', {
        classId,
        date: dateISO,
        items,
    });
}
