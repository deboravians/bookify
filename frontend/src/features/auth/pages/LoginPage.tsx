import { Navigate } from 'react-router'
import { AuthLayout } from '../components/AuthLayout/AuthLayout'
import { LoginForm } from '../components/LoginForm/LoginForm'
import { isAuthenticated } from '../services/authService'

export function LoginPage() {
  if (isAuthenticated()) return <Navigate to="/alunos" replace />

  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  )
}
