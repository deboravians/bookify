import type { Classification, ClassificationInput } from '../types'

let classifications: Classification[] = [
  { id: '1', code: 'ROM-10', title: 'Romance', bookCount: 12 },
  { id: '2', code: 'FIC-20', title: 'Ficção Científica', bookCount: 5 },
  { id: '3', code: 'BI-30', title: 'Biografias', bookCount: 3 },
  { id: '4', code: 'AA-40', title: 'Autoajuda', bookCount: 0 },
  { id: '5', code: 'LB-50', title: 'Literatura Brasileira', bookCount: 8 },
  { id: '6', code: 'PO-60', title: 'Poesia', bookCount: 0 },
]

function delay(ms = 500) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function codeInUse(code: string, ignoreId?: string) {
  return classifications.some(
    (c) => c.code.toLowerCase() === code.toLowerCase() && c.id !== ignoreId,
  )
}

export async function listClassifications(): Promise<Classification[]> {
  await delay()
  return classifications
}

export async function getClassification(id: string): Promise<Classification> {
  await delay()
  const classification = classifications.find((c) => c.id === id)
  if (!classification) throw new Error('Classificação não encontrada.')
  return classification
}

export async function createClassification(data: ClassificationInput): Promise<Classification> {
  await delay()
  if (codeInUse(data.code)) throw new Error('Já existe uma classificação com esse código.')

  const newClassification: Classification = { ...data, id: crypto.randomUUID(), bookCount: 0 }
  classifications = [...classifications, newClassification]
  return newClassification
}

export async function updateClassification(
  id: string,
  data: ClassificationInput,
): Promise<Classification> {
  const classification = await getClassification(id)
  if (codeInUse(data.code, id)) throw new Error('Já existe uma classificação com esse código.')

  const updated: Classification = { ...classification, ...data }
  classifications = classifications.map((c) => (c.id === id ? updated : c))
  return updated
}

export async function deleteClassification(id: string): Promise<void> {
  const classification = await getClassification(id)
  if (classification.bookCount > 0) {
    throw new Error('Não é possível excluir uma classificação com livros associados.')
  }
  classifications = classifications.filter((c) => c.id !== id)
}
