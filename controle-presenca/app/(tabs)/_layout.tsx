// app/(tabs)/_layout.tsx
import { Redirect, Tabs } from 'expo-router';
import { useEffect, useState } from 'react';
import { getRole } from '@/auth/session';
import type { UserRole } from '@/types';

export default function TabsLayout() {
    const [role, setRole] = useState<UserRole | null>(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        (async () => {
            const r = await getRole();
            setRole(r ?? null);
            setReady(true);
        })();
    }, []);

    if (!ready) return null;

    // se for admin e cair aqui por algum motivo, manda pra área de admin
    if (role === 'admin') return <Redirect href="/admin" />;

    // se não for professor, volta pro login
    if (role !== 'teacher') return <Redirect href="/login" />;

    // professor logado → tabs normais
    return (
        <Tabs>
            <Tabs.Screen name="index"   options={{ title: 'Presença' }} />
            <Tabs.Screen name="explore" options={{ title: 'Explorar' }} />
        </Tabs>
    );
}
