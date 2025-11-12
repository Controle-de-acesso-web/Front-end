import { Stack } from 'expo-router';

export default function AdminLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: 'Admin • Painel' }} />
            <Stack.Screen name="teachers/new" options={{ title: 'Novo Professor' }} />
            <Stack.Screen name="students/new" options={{ title: 'Novo Aluno' }} />
        </Stack>
    );
}
