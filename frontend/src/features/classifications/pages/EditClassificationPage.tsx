import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { ClassificationForm } from '../components/ClassificationForm/ClassificationForm'
import { getClassification, updateClassification } from '../services/classificationService'
import type { Classification, ClassificationInput } from '../types'
import styles from './EditClassificationPage.module.css'

export function EditClassificationPage() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const [classification, setClassification] = useState<Classification | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getClassification(id)
      .then(setClassification)
      .catch((err: Error) => setError(err.message))
      .finally(() => setIsLoading(false))
  }, [id])

  async function handleSubmit(data: ClassificationInput) {
    await updateClassification(id, data)
    navigate('/classificacoes')
  }

  if (isLoading) return <p className={styles.message}>Carregando classificação...</p>

  if (error || !classification) {
    return (
      <div className={styles.message}>
        <p>{error ?? 'Não foi possível carregar a classificação.'}</p>
        <Link to="/classificacoes">Voltar para a lista de classificações</Link>
      </div>
    )
  }

  return (
    <>
      <PageHeader
        title="Editar Classificação"
        description="Altere o código ou o título da classificação"
      />
      <ClassificationForm
        defaultValues={{ code: classification.code, title: classification.title }}
        onSubmit={handleSubmit}
        submitLabel="Salvar Alterações"
      />
    </>
  )
}
