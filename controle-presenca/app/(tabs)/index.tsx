// app/(tabs)/index.tsx
import { useEffect, useMemo, useState } from 'react';
import { View, Text, Pressable, FlatList, Alert } from 'react-native';
import { router } from 'expo-router';
import { getSession, clearSession } from '@/auth/session';
import { fetchStudentsByClass, fetchAttendanceForDate, saveAttendanceBulk } from '@/api/attendance';
import type { AttendanceStatus, ClassId, Student } from '@/types';

function formatDateISO(d: Date) {
    return d.toISOString().slice(0, 10);
}

function nextStatus(s: AttendanceStatus): AttendanceStatus {
    if (s === null) return 'P';
    if (s === 'P') return 'F';
    if (s === 'F') return 'T';
    return null;
}

export default function TeacherAttendanceScreen() {
    const [classId, setClassId] = useState<ClassId>('A');
    const [date] = useState<Date>(new Date());
    const [students, setStudents] = useState<Student[]>([]);
    const [marks, setMarks] = useState<Record<string, AttendanceStatus>>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // turma do professor
    useEffect(() => {
        (async () => {
            const s = await getSession();
            if (s?.role === 'teacher' && s.classId) {
                setClassId(s.classId);
            }
        })();
    }, []);

    // alunos + presença do dia
    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const [stds, att] = await Promise.all([
                    fetchStudentsByClass(classId),
                    fetchAttendanceForDate(classId, formatDateISO(date)),
                ]);
                setStudents(stds);
                const dict: Record<string, AttendanceStatus> = {};
                att.forEach(a => (dict[a.studentId] = a.status));
                setMarks(dict);
            } finally {
                setLoading(false);
            }
        })();
    }, [classId, date]);

    const totals = useMemo(() => {
        let P = 0, F = 0, T = 0, N = 0;
        students.forEach(s => {
            const st = marks[s.id] ?? null;
            if (st === 'P') P++;
            else if (st === 'F') F++;
            else if (st === 'T') T++;
            else N++;
        });
        return { P, F, T, N };
    }, [students, marks]);

    function toggle(studentId: string) {
        setMarks(prev => ({
            ...prev,
            [studentId]: nextStatus(prev[studentId] ?? null),
        }));
    }

    async function onSave() {
        try {
            setSaving(true);
            const items = students.map(s => ({
                studentId: s.id,
                status: marks[s.id] ?? null,
            }));
            await saveAttendanceBulk(classId, formatDateISO(date), items);
            Alert.alert('Pronto!', 'Presenças salvas com sucesso.');
        } catch {
            Alert.alert('Erro', 'Não foi possível salvar.');
        } finally {
            setSaving(false);
        }
    }

    async function onLogout() {
        await clearSession();
        router.replace('/login');
    }

    return (
        <View style={{ flex: 1, padding: 16, gap: 12 }}>
            {/* Cabeçalho + botão sair */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View>
                    <Text style={{ fontSize: 18, fontWeight: '700' }}>Turma {classId}</Text>
                    <Text style={{ color: '#666' }}>Data: {formatDateISO(date)}</Text>
                    <Text style={{ color: '#666' }}>
                        Presente: {totals.P} • Falta: {totals.F} • Atraso: {totals.T} • Em branco: {totals.N}
                    </Text>
                </View>

                <Pressable
                    onPress={onLogout}
                    style={{
                        paddingVertical: 8,
                        paddingHorizontal: 12,
                        borderRadius: 999,
                        backgroundColor: '#999',
                    }}
                >
                    <Text style={{ color: '#fff', fontWeight: '700' }}>Sair</Text>
                </Pressable>
            </View>

            {loading ? (
                <Text>Carregando…</Text>
            ) : (
                <FlatList
                    data={students}
                    keyExtractor={(s) => s.id}
                    ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
                    renderItem={({ item }) => {
                        const st = marks[item.id] ?? null;
                        return (
                            <View
                                style={{
                                    padding: 12,
                                    borderRadius: 10,
                                    backgroundColor: '#fff',
                                    borderWidth: 1,
                                    borderColor: '#ddd',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <View style={{ flexShrink: 1 }}>
                                    <Text style={{ fontWeight: '700' }}>{item.name}</Text>
                                    {item.registration ? (
                                        <Text style={{ color: '#666', fontSize: 12 }}>
                                            Matrícula: {item.registration}
                                        </Text>
                                    ) : null}
                                </View>

                                <Pressable
                                    onPress={() => toggle(item.id)}
                                    style={[
                                        chip.base,
                                        st === 'P' && chip.presente,
                                        st === 'F' && chip.falta,
                                        st === 'T' && chip.atraso,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            chip.textBase,
                                            (st === 'P' || st === 'F' || st === 'T') && chip.textActive,
                                        ]}
                                    >
                                        {st ?? '—'}
                                    </Text>
                                </Pressable>
                            </View>
                        );
                    }}
                    ListEmptyComponent={<Text>Nenhum aluno nessa turma.</Text>}
                />
            )}

            <Pressable
                disabled={saving || loading}
                onPress={onSave}
                style={{
                    padding: 14,
                    borderRadius: 10,
                    backgroundColor: '#2f6fed',
                    alignItems: 'center',
                    opacity: saving || loading ? 0.7 : 1,
                }}
            >
                <Text style={{ color: '#fff', fontWeight: '700' }}>
                    {saving ? 'Salvando...' : 'Salvar presença'}
                </Text>
            </Pressable>
        </View>
    );
}

const chip = {
    base: {
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: '#ccc',
        minWidth: 52,
        alignItems: 'center',
    } as const,
    textBase: { fontWeight: '700', color: '#333' } as const,
    textActive: { color: '#fff' } as const,
    presente: { backgroundColor: '#16a34a', borderColor: '#16a34a' } as const,
    falta:    { backgroundColor: '#dc2626', borderColor: '#dc2626' } as const,
    atraso:   { backgroundColor: '#f59e0b', borderColor: '#f59e0b' } as const,
};
