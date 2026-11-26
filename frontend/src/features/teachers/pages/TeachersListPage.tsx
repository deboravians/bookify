import { useEffect, useState } from 'react'
import { Filter } from 'lucide-react'
import { Button } from '@/components/ui/Button/Button'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { SearchInput } from '@/components/ui/SearchInput/SearchInput'
import { TeachersTable } from '../components/TeachersTable/TeachersTable'
import { listTeachers } from '../services/teacherService'
import type { Teacher } from '../types'
import styles from './TeachersListPage.module.css'

export function TeachersListPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [search, setSearch] = useState('')
  const [onlyActive, setOnlyActive] = useState(false)

  useEffect(() => {
    listTeachers()
      .then(setTeachers)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false))
  }, [])

  const term = search.trim().toLowerCase()
  const cpfTerm = term.replace(/\D/g, '')
  const filteredTeachers = teachers.filter(
    (teacher) =>
      (!onlyActive || teacher.active) &&
      (teacher.name.toLowerCase().includes(term) ||
        (cpfTerm !== '' && teacher.cpf.replace(/\D/g, '').includes(cpfTerm))),
  )

  function renderContent() {
    if (isLoading) return <p className={styles.message}>Carregando professores...</p>
    if (isError) return <p className={styles.message}>Não foi possível carregar os professores.</p>
    if (filteredTeachers.length === 0) {
      return (
        <p className={styles.message}>
          {term || onlyActive
            ? 'Nenhum professor encontrado para os filtros selecionados.'
            : 'Nenhum professor cadastrado.'}
        </p>
      )
    }
    return <TeachersTable teachers={filteredTeachers} />
  }

  return (
    <>
      <PageHeader
        title="Professores Cadastrados"
        description="Gerencie os dados, qualificações e status dos leitores docentes"
      />

      <section className={styles.card}>
        <div className={styles.toolbar}>
          <SearchInput
            className={styles.search}
            placeholder="Filtrar por nome ou CPF..."
            aria-label="Filtrar professores por nome ou CPF"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <Button
            variant="subtle"
            size="sm"
            className={styles.filter}
            aria-pressed={onlyActive}
            onClick={() => setOnlyActive((current) => !current)}
          >
            <Filter size={16} aria-hidden />
            Filtrar Ativos
          </Button>
        </div>
        {renderContent()}
      </section>
    </>
  )
}
