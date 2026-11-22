import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button/Button'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { SearchInput } from '@/components/ui/SearchInput/SearchInput'
import { StudentsTable } from '../components/StudentsTable/StudentsTable'
import { listStudents } from '../services/studentService'
import type { Student } from '../types'
import styles from './StudentsListPage.module.css'

export function StudentsListPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    listStudents()
      .then(setStudents)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false))
  }, [])

  const term = search.trim().toLowerCase()
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(term) || student.registration.includes(term),
  )

  function renderContent() {
    if (isLoading) return <p className={styles.message}>Carregando alunos...</p>
    if (isError) return <p className={styles.message}>Não foi possível carregar os alunos.</p>
    if (filteredStudents.length === 0) {
      return (
        <p className={styles.message}>
          {term ? `Nenhum aluno encontrado para "${search}".` : 'Nenhum aluno cadastrado.'}
        </p>
      )
    }
    return <StudentsTable students={filteredStudents} />
  }

  return (
    <>
      <PageHeader
        title="Alunos Cadastrados"
        description="Gerencie os dados e status dos leitores alunos"
        action={
          <ButtonLink to="/alunos/novo">
            <Plus size={16} aria-hidden />
            Cadastrar Aluno
          </ButtonLink>
        }
      />

      <section className={styles.card}>
        <div className={styles.toolbar}>
          <SearchInput
            className={styles.search}
            placeholder="Filtrar por nome ou matrícula..."
            aria-label="Filtrar alunos por nome ou matrícula"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        {renderContent()}
      </section>
    </>
  )
}
