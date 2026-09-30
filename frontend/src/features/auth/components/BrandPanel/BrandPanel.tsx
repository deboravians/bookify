import { Logo } from '@/components/Logo/Logo'
import styles from './BrandPanel.module.css'

type Quote = {
  text: string
  author: string
}

type BrandPanelProps = {
  quote?: Quote
}

const DEFAULT_QUOTE: Quote = {
  text: 'Um livro é um dispositivo para acender a imaginação.',
  author: 'Alan Bennett',
}

export function BrandPanel({ quote = DEFAULT_QUOTE }: BrandPanelProps) {
  const currentYear = new Date().getFullYear()

  return (
    <aside className={styles.panel}>
      <Logo variant="light" />

      <div className={styles.content}>
        <h2 className={styles.headline}>Cultura, organização e sabedoria em um só lugar.</h2>
        <p className={styles.description}>
          Acesse a plataforma de gerenciamento para organizar acervos, acompanhar empréstimos e
          cultivar o hábito da leitura.
        </p>

        <figure className={styles.quote}>
          <blockquote>
            <p>“{quote.text}”</p>
          </blockquote>
          <figcaption>— {quote.author}</figcaption>
        </figure>
      </div>

      <p className={styles.copyright}>© {currentYear} Bookify. Sistema de Gestão de Acervos.</p>
    </aside>
  )
}
