import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { StudentForm } from '../components/StudentForm/StudentForm'
import { getStudent, updateStudent } from '../services/studentService'
import type { Student, StudentInput } from '../types'
import styles from './EditStudentPage.module.css'

export function EditStudentPage() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const [student, setStudent] = useState<Student | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getStudent(id)
      .then(setStudent)
      .catch((err: Error) => setError(err.message))
      .finally(() => setIsLoading(false))
  }, [id])

  async function handleSubmit(data: StudentInput) {
    await updateStudent(id, data)
    navigate(`/alunos/${id}`)
  }

  if (isLoading) return <p className={styles.message}>Carregando dados do aluno...</p>

  if (error || !student) {
    return (
      <div className={styles.message}>
        <p>{error ?? 'Não foi possível carregar o aluno.'}</p>
        <Link to="/alunos">Voltar para a lista de alunos</Link>
      </div>
    )
  }

  return (
    <>
      <PageHeader title="Editar Aluno" description="Atualize os dados cadastrais do aluno" />
      <StudentForm
        defaultValues={{
          registration: student.registration,
          name: student.name,
          phone: student.phone,
          address: student.address,
        }}
        onSubmit={handleSubmit}
        cancelTo={`/alunos/${id}`}
        submitLabel="Salvar Alterações"
      />
    </>
  )
}
