import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { Button } from '@/components/ui/Button/Button'
import { PasswordField } from '@/components/ui/PasswordField/PasswordField'
import { TextField } from '@/components/ui/TextField/TextField'
import { login, type LoginFormData } from '../../services/authService'
import styles from './LoginForm.module.css'

export function LoginForm() {
  const [submitError, setSubmitError] = useState<string | null>(null)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (data: LoginFormData) => {
    setSubmitError(null)
    try {
      await login(data)
      navigate('/alunos', { replace: true })
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
          {...register('email', {
            required: 'Informe seu e-mail.',
            pattern: { value: /^\S+@\S+\.\S+$/, message: 'Informe um e-mail válido.' },
          })}
        />

        <PasswordField
          label="Senha de Acesso"
          placeholder="••••••••••••"
          autoComplete="current-password"
          required
          error={errors.password?.message}
          {...register('password', { required: 'Informe sua senha.' })}
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
