import { Bell } from 'lucide-react'
import { SearchInput } from '@/components/ui/SearchInput/SearchInput'
import styles from './Topbar.module.css'

export function Topbar() {
  return (
    <header className={styles.topbar}>
      <SearchInput
        variant="pill"
        className={styles.search}
        placeholder="Buscar livro, leitor ou código..."
        aria-label="Busca global"
      />
      <button type="button" className={styles.iconButton} aria-label="Notificações">
        <Bell size={16} aria-hidden />
      </button>
    </header>
  )
}
