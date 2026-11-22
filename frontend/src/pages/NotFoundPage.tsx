import { Link } from 'react-router'

export function NotFoundPage() {
  return (
    <main>
      <h1>Página não encontrada</h1>
      <Link to="/alunos">Voltar para o início</Link>
    </main>
  )
}
