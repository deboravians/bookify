import { Logo } from '@/components/Logo/Logo'
import { BooksIllustration } from './BooksIllustration'
import styles from './BrandPanel.module.css'

export function BrandPanel() {
  return (
    <aside className={styles.panel}>
      <header className={styles.brand}>
        <Logo variant="dark" />
        <span className={styles.brandDescription}>Gestão de bibliotecas</span>
      </header>

      <div className={styles.content}>
        <p className={styles.eyebrow}>Um lugar para cada história.</p>
        <h2 className={styles.headline}>
          Entre livros<br />
          e <em>pessoas.</em>
        </h2>
        <p className={styles.description}>
          Do acervo ao próximo empréstimo, cuide do que faz a sua biblioteca acontecer.
        </p>
        <BooksIllustration />
      </div>

      <footer className={styles.footer}>
        <span>Acervo organizado. Histórias em circulação.</span>
        <span className={styles.footerMark} aria-hidden="true">b.</span>
      </footer>
    </aside>
  )
}
