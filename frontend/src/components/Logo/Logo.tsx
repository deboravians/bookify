import styles from './Logo.module.css'

type LogoProps = {
  variant?: 'light' | 'dark'
}

export function Logo({ variant = 'light' }: LogoProps) {
  return (
    <div className={`${styles.logo} ${styles[variant]}`}>
      <svg className={styles.mark} viewBox="0 0 36 40" fill="none" aria-hidden="true">
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M8 3h11c8 0 12 4 12 10 0 4-2 6-5 8 4 1 7 4 7 8 0 6-5 9-13 9H8V3Zm7 6v10h4c4 0 6-2 6-5s-2-5-6-5h-4Zm0 16v7h5c4 0 6-1 6-4s-2-4-6-4l-5 1Z"
          clipRule="evenodd"
        />
        <path className={styles.spine} d="M2 3h3v35H2z" />
      </svg>
      <span className={styles.name}>Bookify</span>
    </div>
  )
}
