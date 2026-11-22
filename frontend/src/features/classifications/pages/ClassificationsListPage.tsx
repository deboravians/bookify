import { useEffect, useState } from 'react'
import { Info, Plus, Trash2 } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button/Button'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog/ConfirmDialog'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { SearchInput } from '@/components/ui/SearchInput/SearchInput'
import { ClassificationsTable } from '../components/ClassificationsTable/ClassificationsTable'
import { deleteClassification, listClassifications } from '../services/classificationService'
import type { Classification } from '../types'
import styles from './ClassificationsListPage.module.css'

export function ClassificationsListPage() {
  const [classifications, setClassifications] = useState<Classification[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [search, setSearch] = useState('')

  const [toDelete, setToDelete] = useState<Classification | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  useEffect(() => {
    listClassifications()
      .then(setClassifications)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false))
  }, [])

  const term = search.trim().toLowerCase()
  const filteredClassifications = classifications.filter(
    (c) => c.code.toLowerCase().includes(term) || c.title.toLowerCase().includes(term),
  )

  function closeDeleteDialog() {
    setToDelete(null)
    setDeleteError(null)
  }

  async function handleDelete() {
    if (!toDelete) return
    setIsDeleting(true)
    setDeleteError(null)
    try {
      await deleteClassification(toDelete.id)
      setClassifications((current) => current.filter((c) => c.id !== toDelete.id))
      setToDelete(null)
    } catch (error) {
      setDeleteError(error instanceof Error ? error.message : 'Não foi possível excluir.')
    } finally {
      setIsDeleting(false)
    }
  }

  function renderContent() {
    if (isLoading) return <p className={styles.message}>Carregando classificações...</p>
    if (isError) {
      return <p className={styles.message}>Não foi possível carregar as classificações.</p>
    }
    if (filteredClassifications.length === 0) {
      return (
        <p className={styles.message}>
          {term
            ? `Nenhuma classificação encontrada para "${search}".`
            : 'Nenhuma classificação cadastrada.'}
        </p>
      )
    }
    return (
      <ClassificationsTable classifications={filteredClassifications} onDelete={setToDelete} />
    )
  }

  function renderDetails(classification: Classification) {
    return (
      <dl className={styles.details}>
        <div>
          <dt>Código</dt>
          <dd>{classification.code}</dd>
        </div>
        <div>
          <dt>Título</dt>
          <dd>{classification.title}</dd>
        </div>
        <div>
          <dt>Livros associados</dt>
          <dd>
            {classification.bookCount === 0
              ? 'Nenhum'
              : `${classification.bookCount} ${classification.bookCount === 1 ? 'livro' : 'livros'}`}
          </dd>
        </div>
      </dl>
    )
  }

  return (
    <>
      <PageHeader
        title="Classificações Literárias"
        description="Código e denominação dos gêneros literários ativos na biblioteca"
        action={
          <ButtonLink to="/classificacoes/nova">
            <Plus size={16} aria-hidden />
            Nova Classificação
          </ButtonLink>
        }
      />

      <section className={styles.card}>
        <div className={styles.toolbar}>
          <SearchInput
            className={styles.search}
            placeholder="Filtrar por código ou título..."
            aria-label="Filtrar classificações por código ou título"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        {renderContent()}
      </section>

      {toDelete &&
        (toDelete.bookCount > 0 ? (
          <ConfirmDialog
            icon={Info}
            iconVariant="danger"
            title="Não é possível excluir"
            description="Esta classificação possui livros associados. Reclassifique ou remova esses livros antes de excluí-la."
            confirmLabel="Entendi"
            onConfirm={closeDeleteDialog}
          >
            {renderDetails(toDelete)}
          </ConfirmDialog>
        ) : (
          <ConfirmDialog
            variant="danger"
            icon={Trash2}
            title="Excluir classificação?"
            description="A classificação abaixo será removida permanentemente. Esta ação não pode ser desfeita."
            confirmLabel="Excluir Classificação"
            isLoading={isDeleting}
            error={deleteError}
            onConfirm={handleDelete}
            onCancel={closeDeleteDialog}
          >
            {renderDetails(toDelete)}
          </ConfirmDialog>
        ))}
    </>
  )
}
