import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog/ConfirmDialog'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { TeacherInfoCard } from '../components/TeacherInfoCard/TeacherInfoCard'
import { TeacherStatusCard } from '../components/TeacherStatusCard/TeacherStatusCard'
import { getTeacher, setTeacherActive } from '../services/teacherService'
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
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [isSavingStatus, setIsSavingStatus] = useState(false)
  const [statusError, setStatusError] = useState<string | null>(null)

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

  function closeConfirm() {
    setConfirmOpen(false)
    setStatusError(null)
  }

  async function handleConfirmStatus() {
    if (result?.id !== id || !result.teacher || isSavingStatus) return
    const teacher = result.teacher
    setIsSavingStatus(true)
    setStatusError(null)
    try {
      const updated = await setTeacherActive(teacher.id, !teacher.active)
      setResult((current) => current?.id === id ? { ...current, teacher: updated } : current)
      setConfirmOpen(false)
    } catch (error) {
      setStatusError(
        error instanceof Error ? error.message : 'Não foi possível alterar o status. Tente novamente.',
      )
    } finally {
      setIsSavingStatus(false)
    }
  }

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
        <TeacherStatusCard
          active={teacher.active}
          onToggle={() => setConfirmOpen(true)}
          disabled={isSavingStatus}
        />
      </div>

      {confirmOpen &&
        (teacher.active ? (
          <ConfirmDialog
            variant="danger"
            title="Inativar cadastro do professor?"
            description={`${teacher.name} não poderá fazer novos empréstimos enquanto o cadastro estiver inativo. O histórico é mantido e o cadastro pode ser reativado a qualquer momento.`}
            confirmLabel="Inativar Professor"
            isLoading={isSavingStatus}
            error={statusError}
            onConfirm={handleConfirmStatus}
            onCancel={closeConfirm}
          />
        ) : (
          <ConfirmDialog
            title="Reativar cadastro do professor?"
            description={`${teacher.name} voltará a aparecer como ativo e poderá fazer novos empréstimos.`}
            confirmLabel="Reativar Professor"
            isLoading={isSavingStatus}
            error={statusError}
            onConfirm={handleConfirmStatus}
            onCancel={closeConfirm}
          />
        ))}
    </>
  )
}
