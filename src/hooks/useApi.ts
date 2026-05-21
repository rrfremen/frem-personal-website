import { useState, useEffect } from "react";
import { apiFetch } from "@/services/api";


interface ApiState<T> {
    data: T | null
    loading: boolean
    error: string | null
}

export function useApi<T>(path: string) {
    const [state, setState] = useState<ApiState<T>>({
        data: null,
        loading: true,
        error: null,
    })

    useEffect(() => {
        apiFetch<T>(path)
          .then(data => setState({ data, loading: false, error: null}))
          .catch(err => setState({ data: null, loading: false, error: err.message}))
    }, [path])

    return state
}
