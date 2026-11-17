import { useParams } from 'react-router'

export function EditStudentPage() {
  const { id } = useParams()
  return <h1>Editar Aluno {id}</h1>
}
