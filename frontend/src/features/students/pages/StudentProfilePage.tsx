import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { SquarePen } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button/Button'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { LoanHistoryTable } from '../components/LoanHistoryTable/LoanHistoryTable'
import { StudentInfoCard } from '../components/StudentInfoCard/StudentInfoCard'
import { StudentStatusCard } from '../components/StudentStatusCard/StudentStatusCard'
import { getStudent, getStudentLoans } from '../services/studentService'
import type { Loan, Student } from '../types'
import styles from './StudentProfilePage.module.css'

export function StudentProfilePage() {
  const { id = '' } = useParams()
  const [student, setStudent] = useState<Student | null>(null)
  const [loans, setLoans] = useState<Loan[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([getStudent(id), getStudentLoans(id)])
      .then(([studentData, loansData]) => {
        setStudent(studentData)
        setLoans(loansData)
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setIsLoading(false))
  }, [id])

  if (isLoading) return <p className={styles.message}>Carregando perfil...</p>

  if (error || !student) {
    return (
      <div className={styles.message}>
        <p>{error ?? 'Não foi possível carregar o perfil.'}</p>
        <Link to="/alunos">Voltar para a lista de alunos</Link>
      </div>
    )
  }

  return (
    <>
      <PageHeader
        title="Perfil do Leitor"
        description="Informações completas e histórico do aluno"
        action={
          <ButtonLink to={`/alunos/${student.id}/editar`} variant="secondary" size="sm">
            <SquarePen size={14} aria-hidden />
            Editar Dados
          </ButtonLink>
        }
      />

      <div className={styles.grid}>
        <StudentInfoCard student={student} />
        <StudentStatusCard active={student.active} />
      </div>

      <LoanHistoryTable loans={loans} />
    </>
  )
}
