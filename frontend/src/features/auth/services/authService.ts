import type { LoginFormData } from '../schemas/loginSchema'

export type AuthUser = {
  id: string
  name: string
  email: string
}

export async function login({ email }: LoginFormData): Promise<AuthUser> {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return { id: '1', name: 'Usuário', email }
}
