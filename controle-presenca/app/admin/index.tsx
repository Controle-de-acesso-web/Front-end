import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';

export default function AdminHome() {
    return (
        <View style={{ flex:1, gap:16, padding:16, justifyContent:'center' }}>
            <Text style={{ fontSize:22, fontWeight:'700', textAlign:'center' }}>Admin • Painel</Text>

            <Pressable onPress={() => router.push('/admin/teachers/new')}
                       style={btn}><Text style={btnTxt}>Cadastrar Professor</Text></Pressable>

            <Pressable onPress={() => router.push('/admin/students/new')}
                       style={btn}><Text style={btnTxt}>Cadastrar Aluno</Text></Pressable>
        </View>
    );
}
const btn    = { padding:14, borderRadius:10, backgroundColor:'#2f6fed', alignItems:'center' } as const;
const btnTxt = { color:'#fff', fontWeight:'700' } as const;
