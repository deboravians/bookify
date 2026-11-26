import { ArrowUpRight, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router'
import styles from './ShortcutCard.module.css'

type ShortcutCardProps = {
  title: string
  description: string
  category: string
  icon: LucideIcon
  to?: string
}

export function ShortcutCard({ title, description, category, icon: Icon, to }: ShortcutCardProps) {
  const content = (
    <>
      <div className={styles.top}>
        <span className={styles.icon}><Icon size={20} strokeWidth={1.5} aria-hidden /></span>
        {to ? <ArrowUpRight size={17} className={styles.arrow} aria-hidden /> : (
          <span className={styles.soon}>Em breve</span>
        )}
      </div>
      <span className={styles.category}>{category}</span>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </>
  )

  return (
    <li className={styles.floating}>
      {to ? (
        <Link to={to} className={styles.card}>{content}</Link>
      ) : (
        <article className={`${styles.card} ${styles.upcoming}`}>{content}</article>
      )}
    </li>
  )
}
