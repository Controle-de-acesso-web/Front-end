// app/(auth)/_layout.tsx
import { Stack, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { getSession } from '@/auth/session';

export default function AuthLayout() {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        (async () => {
            const s = await getSession();
            if (s) router.replace(s.role === 'admin' ? '/admin' : '/');
            setReady(true);
        })();
    }, []);

    if (!ready) return null;

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" />
            <Stack.Screen name="register" />
        </Stack>
    );
}
