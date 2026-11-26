import type { Address, Teacher } from '../../types'
import styles from './TeacherInfoCard.module.css'

function formatAddress({ street, number, complement, neighborhood, city }: Address) {
  const firstPart = [street, number, complement, neighborhood].filter(Boolean).join(', ')
  if (firstPart && city) return `${firstPart} - ${city}`
  return firstPart || city || '-'
}

function formatCpf(cpf: string) {
  return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4')
}

type TeacherInfoCardProps = {
  teacher: Teacher
}

export function TeacherInfoCard({ teacher }: TeacherInfoCardProps) {
  return (
    <section className={styles.card}>
      <h2 className={styles.title}>Informações de Registro</h2>
      <dl className={styles.list}>
        <div className={styles.row}>
          <dt>CPF</dt>
          <dd>{formatCpf(teacher.cpf)}</dd>
        </div>
        <div className={styles.row}>
          <dt>Nome Completo</dt>
          <dd>{teacher.name}</dd>
        </div>
        <div className={styles.row}>
          <dt>Telefone</dt>
          <dd>{teacher.phone || '-'}</dd>
        </div>
        <div className={styles.row}>
          <dt>Endereço</dt>
          <dd>{formatAddress(teacher.address)}</dd>
        </div>
      </dl>
    </section>
  )
}
