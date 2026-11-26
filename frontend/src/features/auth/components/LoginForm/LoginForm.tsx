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
    defaultValues: { username: '', password: '' },
  })

  const onSubmit = async (data: LoginFormData) => {
    setSubmitError(null)
    try {
      await login(data)
      navigate('/alunos', { replace: true })
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Não foi possível entrar.')
    }
  }

  return (
    <section className={styles.card} aria-labelledby="login-title">
      <header className={styles.header}>
        <p className={styles.eyebrow}>Sua biblioteca, por aqui.</p>
        <h1 id="login-title" className={styles.title}>
          Bom ter você de volta.
        </h1>
        <p className={styles.subtitle}>
          Entre com seu usuário para continuar.
        </p>
      </header>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          label="Usuário"
          placeholder="Seu usuário"
          autoComplete="username"
          required
          error={errors.username?.message}
          {...register('username', { required: 'Informe seu usuário.' })}
        />

        <PasswordField
          label="Senha"
          placeholder="Sua senha"
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
          {isSubmitting ? 'Entrando...' : 'Entrar na biblioteca'}
        </Button>
      </form>
      <p className={styles.help}>
        Precisa de acesso? Fale com o responsável pela biblioteca.
      </p>
    </section>
  )
}
