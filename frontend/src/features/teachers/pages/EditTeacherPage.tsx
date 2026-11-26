import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { TeacherForm } from '../components/TeacherForm/TeacherForm'
import { getTeacher, updateTeacher } from '../services/teacherService'
import type { Teacher, TeacherInput } from '../types'
import styles from './EditTeacherPage.module.css'

type TeacherResult = {
  id: string
  teacher: Teacher | null
  error: string | null
}

export function EditTeacherPage() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const [result, setResult] = useState<TeacherResult | null>(null)

  useEffect(() => {
    let ignore = false
    getTeacher(id)
      .then((teacher) => {
        if (!ignore) setResult({ id, teacher, error: null })
      })
      .catch((error: unknown) => {
        if (!ignore) {
          setResult({
            id,
            teacher: null,
            error: error instanceof Error ? error.message : 'Não foi possível carregar o professor.',
          })
        }
      })

    return () => {
      ignore = true
    }
  }, [id])

  async function handleSubmit(data: TeacherInput) {
    await updateTeacher(id, data)
    navigate(`/professores/${id}`)
  }

  if (result?.id !== id) return <p className={styles.message}>Carregando dados do professor...</p>

  const { teacher, error } = result
  if (error || !teacher) {
    return (
      <div className={styles.message}>
        <p>{error ?? 'Não foi possível carregar o professor.'}</p>
        <Link to="/professores">Voltar para a lista de professores</Link>
      </div>
    )
  }

  return (
    <>
      <PageHeader title="Editar Professor" description="Atualize os dados cadastrais do professor" />
      <TeacherForm
        defaultValues={{
          cpf: teacher.cpf,
          name: teacher.name,
          phone: teacher.phone,
          address: teacher.address,
        }}
        onSubmit={handleSubmit}
        cancelTo={`/professores/${id}`}
        submitLabel="Salvar Alterações"
      />
    </>
  )
}
