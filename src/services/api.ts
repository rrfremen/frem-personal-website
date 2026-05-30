const BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function apiFetch<T>(path: string, options?: RequestInit, token?: string): Promise<T> {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(token? { Authorization: `Bearer ${token}` } : {})
    }
    
    const response = await fetch(`${BASE_URL}${path}`, {
        mode: 'cors',
        ...options,
        headers,
    })

    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`)
    }

    return response.json() as Promise<T>
}