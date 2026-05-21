const BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function apiFetch<T>(path: string): Promise<T> {
    const response = await fetch(`${BASE_URL}${path}`, {
        mode: 'cors',
    })

    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`)
    }

    return response.json() as Promise<T>
}