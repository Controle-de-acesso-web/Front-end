import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Session, UserRole, ClassId } from '@/types';
import { api } from '@/api/client';

const KEY = 'session';

export async function getSession(): Promise<Session | null> {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
}

export async function getRole(): Promise<UserRole | null> {
    const s = await getSession();
    return s?.role ?? null;
}

type LoginApiResponse = {
    id: string;
    name: string;
    role: string;    // "teacher"
    classId: ClassId;
};

export async function login(email: string, pass: string): Promise<Session> {
    // 1) ADMIN fixo (sem backend)
    if (email === 'admin@escola.com' && pass === 'admin123') {
        const s: Session = {
            token: 'admin',
            role: 'admin',
            email,
            name: 'Administrador',
        };
        await AsyncStorage.setItem(KEY, JSON.stringify(s));
        return s;
    }

    // 2) PROFESSOR → backend
    try {
        const res = await api.post<LoginApiResponse>('/auth/login', {
            email,
            password: pass,
        });

        const s: Session = {
            token: res.id,          // só pra ter algo
            role: 'teacher',
            email,
            classId: res.classId,
            teacherId: res.id,
            name: res.name,
        };

        await AsyncStorage.setItem(KEY, JSON.stringify(s));
        return s;
    } catch (err) {
        // aqui podemos melhorar depois, por enquanto uma mensagem simples
        throw new Error('E-mail ou senha inválidos.');
    }
}

export async function clearSession() {
    await AsyncStorage.removeItem(KEY);
}
