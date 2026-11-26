import { Badge } from '@/components/ui/Badge/Badge'
import styles from './TeacherStatusCard.module.css'

type TeacherStatusCardProps = {
  active: boolean
}

export function TeacherStatusCard({ active }: TeacherStatusCardProps) {
  return (
    <section className={styles.card}>
      <h2 className={styles.title}>Status do Cadastro</h2>
      <Badge tone={active ? 'success' : 'neutral'}>{active ? 'Ativo' : 'Inativo'}</Badge>
    </section>
  )
}
