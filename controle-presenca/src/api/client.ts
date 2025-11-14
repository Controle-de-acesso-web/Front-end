// src/api/client.ts
const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:8080';

type HttpMethod = 'GET' | 'POST' | 'PUT';

async function request<T>(
    method: HttpMethod,
    path: string,
    body?: unknown,
    extraHeaders: Record<string, string> = {}
): Promise<T> {

    // 🔍 AQUI! Coloque este console.log
    console.log('📡 FETCH =>', `${BASE_URL}${path}`, {
        method,
        body,
        headers: extraHeaders,
    });

    const res = await fetch(`${BASE_URL}${path}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...extraHeaders,
        },
        body: body == null ? undefined : JSON.stringify(body),
    });

    if (!res.ok) {
        const text = await res.text().catch(() => '');
        console.log('❌ ERRO DO FETCH:', res.status, text);
        throw new Error(text || `HTTP ${res.status}`);
    }

    if (res.status === 204) {
        return undefined as unknown as T;
    }

    return (await res.json()) as T;
}

export const api = {
    get:  <T>(path: string, headers?: Record<string, string>) =>
        request<T>('GET', path, undefined, headers),
    post: <T>(path: string, body?: unknown, headers?: Record<string, string>) =>
        request<T>('POST', path, body, headers),
    put:  <T>(path: string, body?: unknown, headers?: Record<string, string>) =>
        request<T>('PUT', path, body, headers),
};
