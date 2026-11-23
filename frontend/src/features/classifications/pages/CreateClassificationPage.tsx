import { useNavigate } from 'react-router'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { ClassificationForm } from '../components/ClassificationForm/ClassificationForm'
import { createClassification } from '../services/classificationService'
import type { ClassificationInput } from '../types'

export function CreateClassificationPage() {
  const navigate = useNavigate()

  async function handleSubmit(data: ClassificationInput) {
    await createClassification(data)
    navigate('/classificacoes')
  }

  return (
    <>
      <PageHeader
        title="Nova Classificação"
        description="Determine o código e o título identificador da nova classificação"
      />
      <ClassificationForm onSubmit={handleSubmit} />
    </>
  )
}
