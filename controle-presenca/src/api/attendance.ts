import { api } from './client';
import type { AttendanceStatus, ClassId, Student } from '@/types';

export async function fetchStudentsByClass(classId: ClassId) {
    return api.get<Student[]>(`/classes/${classId}/students`);
}

export async function fetchAttendanceForDate(classId: ClassId, dateISO: string) {
    return api.get<Array<{ studentId: string; status: AttendanceStatus }>>(
        `/classes/${classId}/attendance?date=${encodeURIComponent(dateISO)}`
    );
}

export async function saveAttendanceBulk(
    classId: ClassId,
    dateISO: string,
    items: Array<{ studentId: string; status: AttendanceStatus }>
) {
    return api.post<void>(`/classes/${classId}/attendance`, { date: dateISO, items });
}
