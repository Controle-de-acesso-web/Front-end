// app/admin/_layout.tsx
import { Stack, Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { getRole } from '@/auth/session';

export default function AdminLayout() {
    const [ready, setReady] = useState(false);
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

    useEffect(() => {
        (async () => {
            const role = await getRole();
            setIsAdmin(role === 'admin');
            setReady(true);
        })();
    }, []);

    if (!ready) return null;
    // AJUSTE AQUI
    if (isAdmin === false) return <Redirect href="/login" />;

    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: 'Admin • Painel' }} />
            <Stack.Screen name="teachers/new" options={{ title: 'Novo Professor' }} />
            <Stack.Screen name="students/new" options={{ title: 'Novo Aluno' }} />
        </Stack>
    );
}
