import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { Stack, router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createStudent } from '@/api/admin';

const CLASSES = ['A','B','C','D'] as const;
const schema = z.object({
    name: z.string().min(2, 'Informe o nome'),
    registration: z.string().optional(),
    classId: z.enum(CLASSES),
});
type FormData = z.infer<typeof schema>;

export default function NewStudent() {
    const { handleSubmit, setValue, control, formState:{ errors, isSubmitting } } =
        useForm<FormData>({ resolver: zodResolver(schema), defaultValues:{ classId:'A' } });

    const bind = (k: keyof FormData) => ({
        onChangeText: (t: string) => setValue(k, t as any, { shouldValidate:true })
    });

    async function onSubmit(data: FormData) {
        try {
            await createStudent({
                name: data.name,
                registration: data.registration,
                classId: data.classId,
            });

            Alert.alert('Aluno cadastrado', `${data.name} • Turma ${data.classId}`);
            router.back();
        } catch (e) {
            console.error(e);
            Alert.alert('Erro', 'Não foi possível cadastrar o aluno.');
        }
    }


    return (
        <>
            <Stack.Screen options={{ title: 'Novo Aluno' }} />
            <View style={{ padding:16, gap:12 }}>
                <TextInput placeholder="Nome do aluno" style={s.input} {...bind('name')} />
                {errors.name && <Text style={s.err}>{errors.name.message}</Text>}

                <TextInput placeholder="Matrícula (opcional)" style={s.input} {...bind('registration')} />

                <Text style={{ fontWeight:'600' }}>Turma</Text>
                <Controller
                    control={control}
                    name="classId"
                    render={({ field:{ value, onChange } }) => (
                        <View style={{ flexDirection:'row', gap:8 }}>
                            {CLASSES.map(c => (
                                <Pressable key={c} onPress={() => onChange(c)}
                                           style={[s.chip, value === c && s.chipActive]}>
                                    <Text style={[s.chipTxt, value === c && s.chipTxtActive]}>{c}</Text>
                                </Pressable>
                            ))}
                        </View>
                    )}
                />
                {errors.classId && <Text style={s.err}>{errors.classId.message}</Text>}

                <Pressable onPress={handleSubmit(onSubmit)} disabled={isSubmitting}
                           style={[s.button, { opacity: isSubmitting ? 0.7 : 1 }]}>
                    <Text style={s.buttonTxt}>{isSubmitting ? 'Salvando...' : 'Cadastrar Aluno'}</Text>
                </Pressable>
            </View>
        </>
    );
}

const s = {
    input: { padding:12, borderWidth:1, borderColor:'#ddd', borderRadius:10, backgroundColor:'#fff' } as const,
    button: { padding:14, borderRadius:10, backgroundColor:'#2f6fed', alignItems:'center' } as const,
    buttonTxt: { color:'#fff', fontWeight:'700' } as const,
    err: { color:'#d00', fontSize:12 } as const,
    chip: { paddingVertical:8, paddingHorizontal:14, borderRadius:999, borderWidth:1, borderColor:'#ccc' } as const,
    chipActive: { backgroundColor:'#2f6fed', borderColor:'#2f6fed' } as const,
    chipTxt: { color:'#333', fontWeight:'600' } as const,
    chipTxtActive: { color:'#fff' } as const,
};
