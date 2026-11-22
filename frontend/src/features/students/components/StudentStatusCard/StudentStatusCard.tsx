import { Badge } from '@/components/ui/Badge/Badge'
import styles from './StudentStatusCard.module.css'

type StudentStatusCardProps = {
  active: boolean
}

export function StudentStatusCard({ active }: StudentStatusCardProps) {
  return (
    <section className={styles.card}>
      <h2 className={styles.title}>Status do Cadastro</h2>
      <Badge tone={active ? 'success' : 'neutral'}>{active ? 'Ativo' : 'Inativo'}</Badge>
    </section>
  )
}
