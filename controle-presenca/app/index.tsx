// app/index.tsx
import { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import { getSession } from '@/auth/session';

type Target = '/login' | '/admin' | '/(tabs)' | 'loading';

export default function IndexGate() {
    const [target, setTarget] = useState<Target>('loading');

    useEffect(() => {
        (async () => {
            const s = await getSession();
            console.log('🔎 IndexGate -> sessão:', s);

            if (!s) {
                setTarget('/login');
            } else if (s.role === 'admin') {
                setTarget('/admin');
            } else {
                setTarget('/(tabs)');
            }
        })();
    }, []);

    if (target === 'loading') return null;

    console.log('➡️ Redirecionando para:', target);
    return <Redirect href={target} />;
}
