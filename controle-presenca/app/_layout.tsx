import { Stack } from 'expo-router';

export default function RootLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            {/* Grupos ocultos: não aparecem na URL */}
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

            {/* Área administrativa com prefixo real /admin */}
            <Stack.Screen name="admin" options={{ headerShown: false }} />
        </Stack>
    );
}
