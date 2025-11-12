// src/auth/session.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Session, UserRole, ClassId } from '@/types';

const KEY = 'session';

export async function getSession(): Promise<Session | null> {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
}

export async function getRole(): Promise<UserRole | null> {
    const s = await getSession();
    return s?.role ?? null;
}

export async function login(email: string, pass: string): Promise<Session> {
    // ADMIN "chumbado"
    if (email === 'admin@escola.com' && pass === 'admin123') {
        const s: Session = { token: 'admin-token', role: 'admin', email };
        await AsyncStorage.setItem(KEY, JSON.stringify(s));
        return s;
    }

    // Teacher mock (ex.: turma A)
    if (pass.length >= 3) {
        const s: Session = {
            token: 'teacher-token',
            role: 'teacher',
            email,
            classId: 'A' as ClassId,
        };
        await AsyncStorage.setItem(KEY, JSON.stringify(s));
        return s;
    }

    throw new Error('Credenciais inválidas');
}

export async function clearSession() {
    await AsyncStorage.removeItem(KEY);
}
