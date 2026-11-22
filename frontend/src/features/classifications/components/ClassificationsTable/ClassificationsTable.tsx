import { Button, ButtonLink } from '@/components/ui/Button/Button'
import type { Classification } from '../../types'
import styles from './ClassificationsTable.module.css'

type ClassificationsTableProps = {
  classifications: Classification[]
  onDelete: (classification: Classification) => void
}

export function ClassificationsTable({ classifications, onDelete }: ClassificationsTableProps) {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">Código</th>
            <th scope="col">Título / Gênero</th>
            <th scope="col" className={styles.actions}>
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {classifications.map((classification) => (
            <tr key={classification.id}>
              <td className={styles.code}>{classification.code}</td>
              <td>{classification.title}</td>
              <td className={styles.actions}>
                <div className={styles.buttons}>
                  <ButtonLink
                    to={`/classificacoes/${classification.id}/editar`}
                    variant="secondary"
                    size="sm"
                    aria-label={`Editar ${classification.title}`}
                  >
                    Editar
                  </ButtonLink>
                  <Button
                    variant="subtle"
                    size="sm"
                    onClick={() => onDelete(classification)}
                    aria-label={`Excluir ${classification.title}`}
                  >
                    Excluir
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
