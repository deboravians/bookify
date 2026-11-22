import { Badge } from '@/components/ui/Badge/Badge'
import { ButtonLink } from '@/components/ui/Button/Button'
import type { Student } from '../../types'
import styles from './StudentsTable.module.css'

type StudentsTableProps = {
  students: Student[]
}

export function StudentsTable({ students }: StudentsTableProps) {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">Matrícula</th>
            <th scope="col">Nome</th>
            <th scope="col">Telefone</th>
            <th scope="col">Status</th>
            <th scope="col" className={styles.actions}>
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td className={styles.registration}>{student.registration}</td>
              <td>{student.name}</td>
              <td className={styles.muted}>{student.phone || '-'}</td>
              <td>
                <Badge tone={student.active ? 'success' : 'neutral'}>
                  {student.active ? 'Ativo' : 'Inativo'}
                </Badge>
              </td>
              <td className={styles.actions}>
                <ButtonLink
                  to={`/alunos/${student.id}`}
                  variant="secondary"
                  size="sm"
                  aria-label={`Ver perfil de ${student.name}`}
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
