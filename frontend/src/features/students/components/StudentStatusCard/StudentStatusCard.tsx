import { Badge } from '@/components/ui/Badge/Badge'
import { Switch } from '@/components/ui/Switch/Switch'
import styles from './StudentStatusCard.module.css'

type StudentStatusCardProps = {
  active: boolean
  onToggle: () => void
}

export function StudentStatusCard({ active, onToggle }: StudentStatusCardProps) {
  return (
    <section className={styles.card}>
      <h2 className={styles.title}>Status do Cadastro</h2>
      <Badge tone={active ? 'success' : 'neutral'}>{active ? 'Ativo' : 'Inativo'}</Badge>
      <Switch
        label={active ? 'Status Ativo' : 'Status Inativo'}
        checked={active}
        onChange={onToggle}
      />
    </section>
  )
}
