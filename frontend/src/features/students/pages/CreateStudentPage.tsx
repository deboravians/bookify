import { useNavigate } from 'react-router'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { StudentForm } from '../components/StudentForm/StudentForm'
import { createStudent } from '../services/studentService'
import type { StudentInput } from '../types'

export function CreateStudentPage() {
  const navigate = useNavigate()

  async function handleSubmit(data: StudentInput) {
    await createStudent(data)
    navigate('/alunos')
  }

  return (
    <>
      <PageHeader
        title="Cadastrar Novo Aluno"
        description="Insira os dados cadastrais do novo leitor"
      />
      <StudentForm onSubmit={handleSubmit} cancelTo="/alunos" />
    </>
  )
}
