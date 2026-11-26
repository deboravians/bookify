import { Badge } from '@/components/ui/Badge/Badge'
import { Switch } from '@/components/ui/Switch/Switch'
import styles from './TeacherStatusCard.module.css'

type TeacherStatusCardProps = {
  active: boolean
  onToggle: () => void
  disabled?: boolean
}

export function TeacherStatusCard({ active, onToggle, disabled }: TeacherStatusCardProps) {
  return (
    <section className={styles.card}>
      <h2 className={styles.title}>Status do Cadastro</h2>
      <Badge tone={active ? 'success' : 'neutral'}>{active ? 'Ativo' : 'Inativo'}</Badge>
      <Switch
        label={active ? 'Status Ativo' : 'Status Inativo'}
        checked={active}
        onChange={onToggle}
        disabled={disabled}
      />
    </section>
  )
}
