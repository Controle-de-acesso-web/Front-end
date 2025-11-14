// src/auth/session.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Session, UserRole, ClassId } from '@/types';
import { api } from '@/api/client';

const KEY = 'session';
const isWeb = typeof window !== 'undefined';

// ---- helpers de persistência ----
async function saveRaw(json: string) {
    try {
        await AsyncStorage.setItem(KEY, json);
    } catch (err) {
        console.log('⚠️ Erro salvando em AsyncStorage:', err);
    }

    if (isWeb) {
        try {
            window.localStorage.setItem(KEY, json);
        } catch (err) {
            console.log('⚠️ Erro salvando em localStorage:', err);
        }
    }
}

async function readRaw(): Promise<string | null> {
    // 1) tenta AsyncStorage
    try {
        const raw = await AsyncStorage.getItem(KEY);
        if (raw) return raw;
    } catch (err) {
        console.log('⚠️ Erro lendo AsyncStorage:', err);
    }

    // 2) fallback: localStorage
    if (isWeb) {
        try {
            const rawWeb = window.localStorage.getItem(KEY);
            if (rawWeb) return rawWeb;
        } catch (err) {
            console.log('⚠️ Erro lendo localStorage:', err);
        }
    }

    return null;
}

async function clearRaw() {
    try {
        await AsyncStorage.removeItem(KEY);
    } catch (err) {
        console.log('⚠️ Erro removendo de AsyncStorage:', err);
    }

    if (isWeb) {
        try {
            window.localStorage.removeItem(KEY);
        } catch (err) {
            console.log('⚠️ Erro removendo de localStorage:', err);
        }
    }
}

// ---- API pública ----

export async function getSession(): Promise<Session | null> {
    const raw = await readRaw();
    if (!raw) {
        // console.log('🔎 getSession -> null');
        return null;
    }

    try {
        const s = JSON.parse(raw) as Session;
        // console.log('🔎 getSession ->', s);
        return s;
    } catch (err) {
        console.log('⚠️ Erro parseando sessão, limpando...', err);
        await clearRaw();
        return null;
    }
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

async function persistSession(s: Session) {
    const json = JSON.stringify(s);
    await saveRaw(json);
}

export async function login(email: string, pass: string): Promise<Session> {
    // 1) ADMIN fixo
    if (email === 'admin@escola.com' && pass === 'admin123') {
        const s: Session = {
            token: 'admin',
            role: 'admin',
            email,
            name: 'Administrador',
        };
        await persistSession(s);
        return s;
    }

    // 2) PROFESSOR -> backend
    try {
        const res = await api.post<LoginApiResponse>('/auth/login', {
            email,
            password: pass,
        });

        const s: Session = {
            token: res.id,
            role: 'teacher',
            email,
            classId: res.classId,
            teacherId: res.id,
            name: res.name,
        };

        await persistSession(s);
        return s;
    } catch (err) {
        throw new Error('E-mail ou senha inválidos.');
    }
}

export async function clearSession() {
    await clearRaw();
}
