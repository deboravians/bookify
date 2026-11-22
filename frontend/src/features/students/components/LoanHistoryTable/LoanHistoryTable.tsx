import { Badge } from '@/components/ui/Badge/Badge'
import type { Loan, LoanStatus } from '../../types'
import styles from './LoanHistoryTable.module.css'

const statusBadge: Record<LoanStatus, { label: string; tone: 'success' | 'neutral' | 'danger' }> = {
  em_andamento: { label: 'Em Andamento', tone: 'neutral' },
  devolvido: { label: 'Devolvido', tone: 'success' },
  em_atraso: { label: 'Em Atraso', tone: 'danger' },
}

function formatDate(date: string) {
  const [year, month, day] = date.split('-')
  return `${day}/${month}/${year}`
}

type LoanHistoryTableProps = {
  loans: Loan[]
}

export function LoanHistoryTable({ loans }: LoanHistoryTableProps) {
  return (
    <section className={styles.card}>
      <h2 className={styles.title}>Histórico de Empréstimos</h2>

      {loans.length === 0 ? (
        <p className={styles.message}>Nenhum empréstimo registrado para este aluno.</p>
      ) : (
        <div className={styles.wrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Livro</th>
                <th scope="col">Data Empréstimo</th>
                <th scope="col">Data Devolução</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <tr key={loan.id}>
                  <td className={styles.book}>{loan.bookTitle}</td>
                  <td className={styles.muted}>{formatDate(loan.loanDate)}</td>
                  <td className={styles.muted}>{formatDate(loan.returnDate)}</td>
                  <td>
                    <Badge tone={statusBadge[loan.status].tone}>
                      {statusBadge[loan.status].label}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
