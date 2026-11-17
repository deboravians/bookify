import { useParams } from 'react-router'

export function StudentProfilePage() {
  const { id } = useParams()
  return <h1>Perfil do Leitor {id}</h1>
}
