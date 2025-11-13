import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import { clearSession } from '@/auth/session';

export default function AdminHome() {
    function handleLogout() {
        clearSession()
            .catch(() => {
                // se quiser, pode exibir um Alert aqui
            })
            .finally(() => {
                router.replace('/login');
            });
    }

    return (
        <View style={{ flex: 1, gap: 16, padding: 16, justifyContent: 'center' }}>
            <Text
                style={{
                    fontSize: 22,
                    fontWeight: '700',
                }}
            >
                Admin • Painel
            </Text>

            <Pressable
                onPress={() => router.push('/admin/teachers/new')}
                style={btn}
            >
                <Text style={btnTxt}>Cadastrar Professor</Text>
            </Pressable>

            <Pressable
                onPress={() => router.push('/admin/students/new')}
                style={btn}
            >
                <Text style={btnTxt}>Cadastrar Aluno</Text>
            </Pressable>

            <Pressable
                onPress={handleLogout}
                style={[btn, { backgroundColor: '#999' }]}
            >
                <Text style={btnTxt}>Sair</Text>
            </Pressable>
        </View>
    );
}

const btn = {
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#2f6fed',
    alignItems: 'center',
} as const;

const btnTxt = {
    color: '#fff',
    fontWeight: '700',
} as const;
