import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, ButtonLink } from '@/components/ui/Button/Button'
import { TextField } from '@/components/ui/TextField/TextField'
import { cpfRules, phoneRules, requiredText, trimText } from '@/lib/formValidation'
import type { TeacherInput } from '../../types'
import styles from './TeacherForm.module.css'

const emptyTeacher: TeacherInput = {
  cpf: '',
  name: '',
  phone: '',
  address: { city: '', neighborhood: '', street: '', number: '', complement: '' },
}

type TeacherFormProps = {
  defaultValues?: TeacherInput
  onSubmit: (data: TeacherInput) => Promise<void>
  cancelTo: string
  submitLabel?: string
}

export function TeacherForm({
  defaultValues = emptyTeacher,
  onSubmit,
  cancelTo,
  submitLabel = 'Salvar Cadastro',
}: TeacherFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TeacherInput>({ defaultValues })

  async function submit(data: TeacherInput) {
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
            label="CPF"
            placeholder="Ex: 223.456.789-00"
            inputMode="numeric"
            required
            error={errors.cpf?.message}
            {...register('cpf', cpfRules)}
          />
          <TextField
            label="Nome Completo"
            placeholder="Nome do Professor"
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
