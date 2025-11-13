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
    role: string;    // vem "teacher" do backend
    classId: ClassId;
};

export async function login(email: string, pass: string): Promise<Session> {
    // 1) ADMIN "chumbado" (não passa pelo backend)
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

    // 2) PROFESSOR -> chama a API /auth/login
    const res = await api.post<LoginApiResponse>('/auth/login', {
        email,
        password: pass,
    });

    const s: Session = {
        token: res.id,           // não temos JWT, então guardo o id só pra diferenciar
        role: 'teacher',
        email,
        classId: res.classId,
        teacherId: res.id,
        name: res.name,
    };

    await AsyncStorage.setItem(KEY, JSON.stringify(s));
    return s;
}

export async function clearSession() {
    await AsyncStorage.removeItem(KEY);
}
