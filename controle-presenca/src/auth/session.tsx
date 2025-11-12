import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'token';
const ROLE_KEY  = 'role'; // 'ADMIN' | 'TEACHER'

export async function saveSession(token: string, role: 'ADMIN'|'TEACHER') {
    await AsyncStorage.multiSet([[TOKEN_KEY, token], [ROLE_KEY, role]]);
}
export async function getToken() { return AsyncStorage.getItem(TOKEN_KEY); }
export async function getRole()  { return AsyncStorage.getItem(ROLE_KEY) as Promise<'ADMIN'|'TEACHER'|null>; }
export async function clearSession() { await AsyncStorage.multiRemove([TOKEN_KEY, ROLE_KEY]); }
