import React from 'react';
import { View, Text, TextInput, Pressable, Alert, ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { router, Stack } from 'expo-router';

// Esquema de validação
const schema = z.object({
    name: z.string().min(2, 'Informe o nome completo'),
    email: z.string().email('E-mail inválido'),
    password: z.string().min(6, 'Mínimo de 6 caracteres'),
    confirm: z.string().min(6, 'Confirme a senha'),
    schoolName: z.string().optional(),
}).refine(d => d.password === d.confirm, {
    path: ['confirm'],
    message: 'As senhas não coincidem',
});

type FormData = z.infer<typeof schema>;

export default function RegisterScreen() {
    const { handleSubmit, setValue, formState: { errors, isSubmitting } } =
        useForm<FormData>({ resolver: zodResolver(schema) });

    const bind = (name: keyof FormData) => ({
        onChangeText: (t: string) => setValue(name, t, { shouldValidate: true }),
    });

    // Neste momento, só mostramos os dados (sem chamar API).
    const onSubmit = async (data: FormData) => {
        Alert.alert(
            'Cadastro (mock)',
            `Nome: ${data.name}\nEmail: ${data.email}\nEscola: ${data.schoolName ?? '-'}`
        );
        // Depois trocaremos por chamada de API e navegaremos para login.
        // router.replace('/(auth)/login');
    };

    return (

        <><Stack.Screen options={{headerShown: false}}/><ScrollView contentContainerStyle={{flexGrow: 1, padding: 16}}>
            <View style={{gap: 12}}>
                <Text style={{fontSize: 22, fontWeight: '700'}}>Cadastro de Professor</Text>

                <TextInput placeholder="Nome completo" style={s.input} {...bind('name')} />
                {errors.name && <Text style={s.err}>{errors.name.message}</Text>}

                <TextInput placeholder="E-mail" keyboardType="email-address" autoCapitalize="none"
                           style={s.input} {...bind('email')} />
                {errors.email && <Text style={s.err}>{errors.email.message}</Text>}

                <TextInput placeholder="Senha" secureTextEntry style={s.input} {...bind('password')} />
                {errors.password && <Text style={s.err}>{errors.password.message}</Text>}

                <TextInput placeholder="Confirmar senha" secureTextEntry style={s.input} {...bind('confirm')} />
                {errors.confirm && <Text style={s.err}>{errors.confirm.message}</Text>}

                <TextInput placeholder="Escola (opcional)" style={s.input} {...bind('schoolName')} />

                <Pressable onPress={handleSubmit(onSubmit)} disabled={isSubmitting}
                           style={[s.button, {opacity: isSubmitting ? 0.7 : 1}]}>
                    <Text style={s.buttonText}>{isSubmitting ? 'Enviando...' : 'Cadastrar'}</Text>
                </Pressable>

                <Pressable onPress={() => router.back()}>
                    <Text style={{textAlign: 'center'}}>Voltar</Text>
                </Pressable>
            </View>
        </ScrollView></>
    );
}

const s = {
    input: { padding:12, borderWidth:1, borderColor:'#ddd', borderRadius:10, backgroundColor:'#fff' } as const,
    button: { padding:14, borderRadius:10, backgroundColor:'#2f6fed', alignItems:'center' } as const,
    buttonText: { color:'#fff', fontWeight:'700' } as const,
    err: { color:'#d00', fontSize:12 } as const,
};
