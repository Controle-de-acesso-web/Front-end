// src/api/client.ts
const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:8080';

type HttpMethod = 'GET' | 'POST' | 'PUT';

async function request<T>(
    method: HttpMethod,
    path: string,
    body?: unknown,
    extraHeaders: Record<string, string> = {}
): Promise<T> {
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
        throw new Error(text || `HTTP ${res.status}`);
    }

    // 204 No Content
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
