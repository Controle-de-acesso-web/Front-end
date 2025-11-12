// app/(tabs)/index.tsx
import { View, Text, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

export default function TabsHome() {
    return (
        <View style={{ flex:1, justifyContent:'center', alignItems:'center', gap:12 }}>
            <Text style={{ fontSize:18, fontWeight:'700' }}>Página inicial do professor</Text>

            {/* botão de sair para testar o guard */}
            <Pressable
                onPress={async () => { await AsyncStorage.removeItem('token'); router.replace('/auth/login'); }}
                style={{ padding:10, backgroundColor:'#eee', borderRadius:10 }}
            >
                <Text>Sair</Text>
            </Pressable>
        </View>
    );
}
