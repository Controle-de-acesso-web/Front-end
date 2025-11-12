import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { router } from 'expo-router';

export default function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    function onLogin() {
        // TODO: autenticar. Por enquanto:
        if (email === 'admin@escola.com' && pass === 'admin123') {
            router.replace('/admin');           // admin
        } else {
            router.replace('/');                // professor (tabs)
        }
    }

    return (
        <View style={{ flex:1, justifyContent:'center', padding:16, gap:12 }}>
            <Text style={{ fontSize:22, fontWeight:'700', textAlign:'center' }}>Entrar</Text>

            <TextInput placeholder="E-mail" autoCapitalize="none" style={s.input} value={email} onChangeText={setEmail} />
            <TextInput placeholder="Senha" secureTextEntry style={s.input} value={pass} onChangeText={setPass} />

            <Pressable onPress={onLogin} style={s.btn}><Text style={s.btnTxt}>Entrar</Text></Pressable>

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
