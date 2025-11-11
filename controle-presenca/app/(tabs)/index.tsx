import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';

export default function TabHome() {
    return (
        <View style={{ flex:1, justifyContent:'center', alignItems:'center', gap:12, padding:16 }}>
            <Text style={{ fontSize:18, fontWeight:'700' }}>Início</Text>

            <Pressable
                onPress={() => router.push('../auth/register')}
                style={{ padding:12, backgroundColor:'#2f6fed', borderRadius:10 }}
            >
                <Text style={{ color:'#fff', fontWeight:'700' }}>
                    Cadastrar de Professor
                </Text>
            </Pressable>
        </View>
    );
}
