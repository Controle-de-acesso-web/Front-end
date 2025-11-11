import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { router } from 'expo-router';
import { login } from '../../src/api/auth';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [busy, setBusy] = useState(false);

    const onLogin = async () => {
        try {
            setBusy(true);
            await login(email.trim(), password);
            router.replace('/(tabs)'); // vai para a tela principal após login
        } catch (e: any) {
            Alert.alert('Falha no login', e?.message || 'Verifique suas credenciais');
        } finally {
            setBusy(false);
        }
    };

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
                value={password}
                onChangeText={setPassword}
            />

            <Pressable onPress={onLogin} disabled={busy} style={[s.button, { opacity: busy ? 0.7 : 1 }]}>
                <Text style={s.buttonText}>{busy ? 'Entrando...' : 'Entrar'}</Text>
            </Pressable>

            {/* 🔹 botão para cadastro */}
            <Pressable onPress={() => router.push('/auth/register')}>
                <Text style={{ textAlign:'center', color:'#2f6fed', fontWeight:'600' }}>
                    Não tem conta? Cadastre-se
                </Text>
            </Pressable>
        </View>
    );
}

const s = {
    input: { padding:12, borderWidth:1, borderColor:'#ddd', borderRadius:10, backgroundColor:'#fff' } as const,
    button: { padding:14, borderRadius:10, backgroundColor:'#2f6fed', alignItems:'center' } as const,
    buttonText: { color:'#fff', fontWeight:'700' } as const,
};
