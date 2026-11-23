import { getToken, logout } from '@/features/auth/services/authService'

export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000'

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken()
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  }).catch(() => {
    throw new Error('Não foi possível conectar ao servidor.')
  })

  if (response.status === 401 && token) {
    logout()
    window.location.href = '/login'
  }

  const body = await response.json().catch(() => null)
  if (!response.ok) {
    throw new Error(body?.message ?? 'Erro ao comunicar com o servidor.')
  }
  return body as T
}
