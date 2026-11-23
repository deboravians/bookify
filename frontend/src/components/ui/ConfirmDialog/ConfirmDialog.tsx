import type { ReactNode } from 'react'
import { RotateCcw, TriangleAlert, type LucideIcon } from 'lucide-react'
import { Button } from '../Button/Button'
import styles from './ConfirmDialog.module.css'

type ConfirmDialogProps = {
  title: string
  description: string
  confirmLabel: string
  variant?: 'primary' | 'danger'
  icon?: LucideIcon
  iconVariant?: 'primary' | 'danger'
  isLoading?: boolean
  error?: string | null
  children?: ReactNode
  onConfirm: () => void
  onCancel?: () => void
}

export function ConfirmDialog({
  title,
  description,
  confirmLabel,
  variant = 'primary',
  icon,
  iconVariant = variant,
  isLoading = false,
  error,
  children,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const Icon = icon ?? (variant === 'danger' ? TriangleAlert : RotateCcw)

  return (
    <div className={styles.overlay}>
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
      >
        <span className={`${styles.icon} ${styles[iconVariant]}`}>
          <Icon size={18} aria-hidden />
        </span>

        <div className={styles.content}>
          <h2 id="confirm-dialog-title" className={styles.title}>
            {title}
          </h2>
          <p className={styles.description}>{description}</p>

          {children}

          {error && (
            <p className={styles.error} role="alert">
              {error}
            </p>
          )}

          <div className={styles.actions}>
            {onCancel && (
              <Button variant="secondary" size="sm" onClick={onCancel} disabled={isLoading} autoFocus>
                Cancelar
              </Button>
            )}
            <Button
              variant={variant}
              size="sm"
              onClick={onConfirm}
              isLoading={isLoading}
              autoFocus={!onCancel}
            >
              {confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
