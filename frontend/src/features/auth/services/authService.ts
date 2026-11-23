import { apiFetch } from '@/lib/api'

export type LoginFormData = {
  username: string
  password: string
}

type LoginResponse = {
  accessToken: string
  tokenType: string
  expiresIn: number
}

const TOKEN_KEY = 'bookify:token'
const EXPIRES_AT_KEY = 'bookify:expiresAt'

export async function login(data: LoginFormData): Promise<void> {
  const response = await apiFetch<LoginResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  })
  localStorage.setItem(TOKEN_KEY, response.accessToken)
  localStorage.setItem(EXPIRES_AT_KEY, String(Date.now() + response.expiresIn * 1000))
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(EXPIRES_AT_KEY)
}

export function getToken(): string | null {
  const token = localStorage.getItem(TOKEN_KEY)
  const expiresAt = Number(localStorage.getItem(EXPIRES_AT_KEY))
  if (!token || Date.now() >= expiresAt) {
    logout()
    return null
  }
  return token
}

export function isAuthenticated() {
  return getToken() !== null
}
