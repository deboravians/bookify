import { useNavigate } from 'react-router'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { TeacherForm } from '../components/TeacherForm/TeacherForm'
import { createTeacher } from '../services/teacherService'
import type { TeacherInput } from '../types'

export function CreateTeacherPage() {
  const navigate = useNavigate()

  async function handleSubmit(data: TeacherInput) {
    await createTeacher(data)
    navigate('/professores')
  }

  return (
    <>
      <PageHeader
        title="Cadastrar Novo Professor"
        description="Insira os dados cadastrais do novo leitor docente"
      />
      <TeacherForm onSubmit={handleSubmit} cancelTo="/professores" />
    </>
  )
}
