import type { ReactNode } from 'react'
import { Logo } from '@/components/Logo/Logo'
import { BrandPanel } from '../BrandPanel/BrandPanel'
import styles from './AuthLayout.module.css'

type AuthLayoutProps = {
  children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className={styles.layout}>
      <div className={styles.brand}>
        <BrandPanel />
      </div>

      <main className={styles.main}>
        <div className={styles.mobileLogo}>
          <Logo variant="dark" />
        </div>
        {children}
      </main>
    </div>
  )
}
