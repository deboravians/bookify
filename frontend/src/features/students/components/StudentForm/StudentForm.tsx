import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, ButtonLink } from '@/components/ui/Button/Button'
import { TextField } from '@/components/ui/TextField/TextField'
import type { StudentInput } from '../../types'
import styles from './StudentForm.module.css'

const emptyStudent: StudentInput = {
  registration: '',
  name: '',
  phone: '',
  address: { city: '', neighborhood: '', street: '', number: '', complement: '' },
}

type StudentFormProps = {
  defaultValues?: StudentInput
  onSubmit: (data: StudentInput) => Promise<void>
  cancelTo: string
  submitLabel?: string
}

export function StudentForm({
  defaultValues = emptyStudent,
  onSubmit,
  cancelTo,
  submitLabel = 'Salvar Cadastro',
}: StudentFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StudentInput>({ defaultValues })

  async function submit(data: StudentInput) {
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
        <legend className={styles.sectionTitle}>Informações Pessoais</legend>
        <div className={styles.grid3}>
          <TextField
            label="Matrícula"
            placeholder="Ex: 2024001"
            inputMode="numeric"
            required
            error={errors.registration?.message}
            {...register('registration', {
              required: 'Informe a matrícula.',
              pattern: { value: /^\d+$/, message: 'A matrícula deve conter apenas números.' },
            })}
          />
          <TextField
            label="Nome Completo"
            placeholder="Nome do Aluno"
            required
            error={errors.name?.message}
            {...register('name', { required: 'Informe o nome completo.' })}
          />
          <TextField
            label="Telefone"
            type="tel"
            placeholder="(11) 98765-4321"
            {...register('phone')}
          />
        </div>
      </fieldset>

      <fieldset className={styles.section}>
        <legend className={styles.sectionTitle}>Endereço Residencial</legend>
        <div className={styles.grid3}>
          <TextField label="Cidade" placeholder="Cidade" {...register('address.city')} />
          <TextField label="Bairro" placeholder="Bairro" {...register('address.neighborhood')} />
          <TextField label="Rua" placeholder="Nome da Rua" {...register('address.street')} />
        </div>
        <div className={styles.grid2}>
          <TextField label="Número" placeholder="Ex: 123" {...register('address.number')} />
          <TextField
            label="Complemento"
            placeholder="Apto, Bloco, etc."
            {...register('address.complement')}
          />
        </div>
      </fieldset>

      {submitError && (
        <p className={styles.submitError} role="alert">
          {submitError}
        </p>
      )}

      <div className={styles.footer}>
        <ButtonLink to={cancelTo} variant="secondary">
          Cancelar
        </ButtonLink>
        <Button type="submit" isLoading={isSubmitting}>
          {isSubmitting ? 'Salvando...' : submitLabel}
        </Button>
      </div>
    </form>
  )
}
