import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, ButtonLink } from '@/components/ui/Button/Button'
import { TextField } from '@/components/ui/TextField/TextField'
import { phoneRules, requiredText, trimText } from '@/lib/formValidation'
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
              ...requiredText('Informe a matrícula.'),
              pattern: { value: /^\d+$/, message: 'A matrícula deve conter apenas números.' },
            })}
          />
          <TextField
            label="Nome Completo"
            placeholder="Nome do Aluno"
            required
            error={errors.name?.message}
            {...register('name', requiredText('Informe o nome completo.'))}
          />
          <TextField
            label="Telefone"
            type="tel"
            placeholder="(11) 98765-4321"
            required
            error={errors.phone?.message}
            {...register('phone', phoneRules)}
          />
        </div>
      </fieldset>

      <fieldset className={styles.section}>
        <legend className={styles.sectionTitle}>Endereço Residencial</legend>
        <div className={styles.grid3}>
          <TextField
            label="Cidade"
            placeholder="Cidade"
            required
            error={errors.address?.city?.message}
            {...register('address.city', requiredText('Informe a cidade.'))}
          />
          <TextField
            label="Bairro"
            placeholder="Bairro"
            required
            error={errors.address?.neighborhood?.message}
            {...register('address.neighborhood', requiredText('Informe o bairro.'))}
          />
          <TextField
            label="Rua"
            placeholder="Nome da Rua"
            required
            error={errors.address?.street?.message}
            {...register('address.street', requiredText('Informe a rua.'))}
          />
        </div>
        <div className={styles.grid2}>
          <TextField
            label="Número"
            placeholder="Ex: 123"
            required
            error={errors.address?.number?.message}
            {...register('address.number', requiredText('Informe o número.'))}
          />
          <TextField
            label="Complemento"
            placeholder="Apto, Bloco, etc."
            {...register('address.complement', { setValueAs: trimText })}
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
