import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { TeacherInfoCard } from '../components/TeacherInfoCard/TeacherInfoCard'
import { TeacherStatusCard } from '../components/TeacherStatusCard/TeacherStatusCard'
import { getTeacher } from '../services/teacherService'
import type { Teacher } from '../types'
import styles from './TeacherProfilePage.module.css'

type ProfileResult = {
  id: string
  teacher: Teacher | null
  error: string | null
}

export function TeacherProfilePage() {
  const { id = '' } = useParams()
  const [result, setResult] = useState<ProfileResult | null>(null)

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
            error: error instanceof Error ? error.message : 'Não foi possível carregar o perfil.',
          })
        }
      })

    return () => {
      ignore = true
    }
  }, [id])

  if (result?.id !== id) return <p className={styles.message}>Carregando perfil...</p>

  const { teacher, error } = result
  if (error || !teacher) {
    return (
      <div className={styles.message}>
        <p>{error ?? 'Não foi possível carregar o perfil.'}</p>
        <Link to="/professores">Voltar para a lista de professores</Link>
      </div>
    )
  }

  return (
    <>
      <PageHeader title="Perfil do Leitor" description="Informações completas do professor" />
      <div className={styles.grid}>
        <TeacherInfoCard teacher={teacher} />
        <TeacherStatusCard active={teacher.active} />
      </div>
    </>
  )
}
