import type { Address, Student } from '../../types'
import styles from './StudentInfoCard.module.css'

function formatAddress({ street, number, complement, neighborhood, city }: Address) {
  const firstPart = [street, number, complement, neighborhood].filter(Boolean).join(', ')
  if (firstPart && city) return `${firstPart} - ${city}`
  return firstPart || city || '-'
}

type StudentInfoCardProps = {
  student: Student
}

export function StudentInfoCard({ student }: StudentInfoCardProps) {
  return (
    <section className={styles.card}>
      <h2 className={styles.title}>Informações de Registro</h2>
      <dl className={styles.list}>
        <div className={styles.row}>
          <dt>Matrícula</dt>
          <dd>{student.registration}</dd>
        </div>
        <div className={styles.row}>
          <dt>Nome Completo</dt>
          <dd>{student.name}</dd>
        </div>
        <div className={styles.row}>
          <dt>Telefone</dt>
          <dd>{student.phone || '-'}</dd>
        </div>
        <div className={styles.row}>
          <dt>Endereço</dt>
          <dd>{formatAddress(student.address)}</dd>
        </div>
      </dl>
    </section>
  )
}
