// app/(auth)/login.tsx
import { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { router } from 'expo-router';
import { login } from '@/auth/session';

export default function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [loading, setLoading] = useState(false);

    async function onLogin() {
        try {
            setLoading(true);
            const session = await login(email.trim(), pass);
            router.replace(session.role === 'admin' ? '/admin' : '/');
        } catch (e) {
            Alert.alert('Erro', 'Não foi possível entrar.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={{ flex:1, justifyContent:'center', padding:16, gap:12 }}>
            <Text style={{ fontSize:22, fontWeight:'700', textAlign:'center' }}>Entrar</Text>

            <TextInput
                placeholder="E-mail"
                autoCapitalize="none"
                keyboardType="email-address"
                style={s.input}
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="Senha"
                secureTextEntry
                style={s.input}
                value={pass}
                onChangeText={setPass}
            />

            <Pressable onPress={onLogin} disabled={loading} style={[s.btn, { opacity: loading ? 0.7 : 1 }]}>
                <Text style={s.btnTxt}>{loading ? 'Entrando...' : 'Entrar'}</Text>
            </Pressable>

            {/* AQUI ESTÁ O AJUSTE */}
            <Pressable onPress={() => router.push('/register')}>
                <Text style={{ textAlign:'center', color:'#2f6fed' }}>Não tem conta? Cadastre-se</Text>
            </Pressable>
        </View>
    );
}

const s = {
    input: { padding:12, borderWidth:1, borderColor:'#ddd', borderRadius:10, backgroundColor:'#fff' } as const,
    btn: { padding:14, borderRadius:10, backgroundColor:'#2f6fed', alignItems:'center' } as const,
    btnTxt: { color:'#fff', fontWeight:'700' } as const,
};
