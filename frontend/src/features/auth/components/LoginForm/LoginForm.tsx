import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/Button/Button'
import { PasswordField } from '@/components/ui/PasswordField/PasswordField'
import { TextField } from '@/components/ui/TextField/TextField'
import { loginSchema, type LoginFormData } from '../../schemas/loginSchema'
import { login } from '../../services/authService'
import styles from './LoginForm.module.css'

export function LoginForm() {
  const [submitError, setSubmitError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (data: LoginFormData) => {
    setSubmitError(null)
    try {
      await login(data)
    } catch {
      setSubmitError('Não foi possível entrar. Verifique suas credenciais.')
    }
  }

  return (
    <section className={styles.card} aria-labelledby="login-title">
      <header className={styles.header}>
        <h1 id="login-title" className={styles.title}>
          Acesse sua conta
        </h1>
        <p className={styles.subtitle}>
          Insira suas credenciais cadastradas para entrar no sistema.
        </p>
      </header>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          label="Endereço de E-mail"
          type="email"
          placeholder="usuario@biblioteca.com"
          autoComplete="email"
          required
          error={errors.email?.message}
          {...register('email')}
        />

        <PasswordField
          label="Senha de Acesso"
          placeholder="••••••••••••"
          autoComplete="current-password"
          required
          error={errors.password?.message}
          {...register('password')}
        />

        {submitError && (
          <p className={styles.submitError} role="alert">
            {submitError}
          </p>
        )}

        <Button type="submit" fullWidth isLoading={isSubmitting} className={styles.submit}>
          {isSubmitting ? 'Entrando...' : 'Entrar no Sistema'}
        </Button>
      </form>
    </section>
  )
}
