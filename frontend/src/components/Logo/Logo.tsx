import { BookOpen } from 'lucide-react'
import styles from './Logo.module.css'

type LogoProps = {
  variant?: 'light' | 'dark'
}

export function Logo({ variant = 'light' }: LogoProps) {
  return (
    <div className={`${styles.logo} ${styles[variant]}`}>
      <span className={styles.mark}>
        <BookOpen size={18} strokeWidth={2} aria-hidden />
      </span>
      <span className={styles.name}>Bookify</span>
    </div>
  )
}
