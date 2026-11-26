import { Badge } from '@/components/ui/Badge/Badge'
import { ButtonLink } from '@/components/ui/Button/Button'
import type { Teacher } from '../../types'
import styles from './TeachersTable.module.css'

function formatCpf(cpf: string) {
  return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4')
}

type TeachersTableProps = {
  teachers: Teacher[]
}

export function TeachersTable({ teachers }: TeachersTableProps) {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">CPF</th>
            <th scope="col">Nome do Docente</th>
            <th scope="col">Telefone</th>
            <th scope="col">Status</th>
            <th scope="col" className={styles.actions}>
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td className={styles.cpf}>{formatCpf(teacher.cpf)}</td>
              <td>{teacher.name}</td>
              <td className={styles.muted}>{teacher.phone || '-'}</td>
              <td>
                <Badge tone={teacher.active ? 'success' : 'neutral'}>
                  {teacher.active ? 'Ativo' : 'Inativo'}
                </Badge>
              </td>
              <td className={styles.actions}>
                <ButtonLink
                  to={`/professores/${teacher.id}`}
                  variant="secondary"
                  size="sm"
                  aria-label={`Ver perfil de ${teacher.name}`}
                >
                  Ver Perfil
                </ButtonLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
