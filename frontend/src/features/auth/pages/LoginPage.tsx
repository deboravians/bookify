import { AuthLayout } from '../components/AuthLayout/AuthLayout'
import { LoginForm } from '../components/LoginForm/LoginForm'

export function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  )
}
