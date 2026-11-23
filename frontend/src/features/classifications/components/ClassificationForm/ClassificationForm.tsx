import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, ButtonLink } from '@/components/ui/Button/Button'
import { TextField } from '@/components/ui/TextField/TextField'
import type { ClassificationInput } from '../../types'
import styles from './ClassificationForm.module.css'

type ClassificationFormProps = {
  defaultValues?: ClassificationInput
  onSubmit: (data: ClassificationInput) => Promise<void>
  submitLabel?: string
}

export function ClassificationForm({
  defaultValues = { code: '', title: '' },
  onSubmit,
  submitLabel = 'Salvar Cadastro',
}: ClassificationFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClassificationInput>({ defaultValues })

  async function submit(data: ClassificationInput) {
    setSubmitError(null)
    try {
      await onSubmit(data)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Não foi possível salvar.')
    }
  }

  return (
    <form className={styles.card} onSubmit={handleSubmit(submit)} noValidate>
      <fieldset className={styles.section}>
        <legend className={styles.sectionTitle}>Dados da Ficha</legend>
        <div className={styles.grid}>
          <TextField
            label="Código"
            placeholder="Ex: ROM-10"
            required
            error={errors.code?.message}
            {...register('code', { required: 'Informe o código.' })}
          />
          <TextField
            label="Título"
            placeholder="Ex: Romance"
            required
            error={errors.title?.message}
            {...register('title', { required: 'Informe o título.' })}
          />
        </div>
      </fieldset>

      {submitError && (
        <p className={styles.submitError} role="alert">
          {submitError}
        </p>
      )}

      <div className={styles.footer}>
        <ButtonLink to="/classificacoes" variant="secondary">
          Cancelar
        </ButtonLink>
        <Button type="submit" isLoading={isSubmitting}>
          {isSubmitting ? 'Salvando...' : submitLabel}
        </Button>
      </div>
    </form>
  )
}
