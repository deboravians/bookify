import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button/Button'
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
  const term = search.trim()

  useEffect(() => {
    let ignore = false
    const timeout = setTimeout(() => {
      setIsLoading(true)
      setIsError(false)
      listTeachers(term)
        .then((data) => {
          if (!ignore) setTeachers(data)
        })
        .catch(() => {
          if (!ignore) setIsError(true)
        })
        .finally(() => {
          if (!ignore) setIsLoading(false)
        })
    }, term ? 300 : 0)

    return () => {
      ignore = true
      clearTimeout(timeout)
    }
  }, [term])

  function renderContent() {
    if (isLoading) return <p className={styles.message}>Carregando professores...</p>
    if (isError) return <p className={styles.message}>Não foi possível carregar os professores.</p>
    if (teachers.length === 0) {
      return (
        <p className={styles.message}>
          {term
            ? `Nenhum professor encontrado para "${search}".`
            : 'Nenhum professor cadastrado.'}
        </p>
      )
    }
    return <TeachersTable teachers={teachers} />
  }

  return (
    <>
      <PageHeader
        title="Professores Cadastrados"
        description="Gerencie os dados, qualificações e status dos leitores docentes"
        action={
          <ButtonLink to="/professores/novo">
            <Plus size={16} aria-hidden />
            Cadastrar Professor
          </ButtonLink>
        }
      />

      <section className={styles.card}>
        <div className={styles.toolbar}>
          <SearchInput
            className={styles.search}
            placeholder="Pesquisar por nome ou CPF..."
            aria-label="Pesquisar professores por nome ou CPF"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        {renderContent()}
      </section>
    </>
  )
}
