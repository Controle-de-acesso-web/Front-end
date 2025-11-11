import AsyncStorage from '@react-native-async-storage/async-storage';

// 💡 Quando o backend estiver pronto, trocaremos isso por uma chamada HTTP real (axios.post)
export async function login(email: string, password: string) {
    if (!email || !password) {
        throw new Error('Preencha e-mail e senha.');
    }

    // mock: login sempre funciona
    const fakeToken = 'mock-token';
    await AsyncStorage.setItem('token', fakeToken);
    return fakeToken;
}

export async function getToken() {
    return AsyncStorage.getItem('token');
}

export async function logout() {
    await AsyncStorage.removeItem('token');
}
