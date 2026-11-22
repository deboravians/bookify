import { RotateCcw, TriangleAlert } from 'lucide-react'
import { Button } from '../Button/Button'
import styles from './ConfirmDialog.module.css'

type ConfirmDialogProps = {
  title: string
  description: string
  confirmLabel: string
  variant?: 'primary' | 'danger'
  isLoading?: boolean
  error?: string | null
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({
  title,
  description,
  confirmLabel,
  variant = 'primary',
  isLoading = false,
  error,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const Icon = variant === 'danger' ? TriangleAlert : RotateCcw

  return (
    <div className={styles.overlay}>
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
      >
        <span className={`${styles.icon} ${styles[variant]}`}>
          <Icon size={18} aria-hidden />
        </span>

        <div className={styles.content}>
          <h2 id="confirm-dialog-title" className={styles.title}>
            {title}
          </h2>
          <p className={styles.description}>{description}</p>

          {error && (
            <p className={styles.error} role="alert">
              {error}
            </p>
          )}

          <div className={styles.actions}>
            <Button variant="secondary" size="sm" onClick={onCancel} disabled={isLoading} autoFocus>
              Cancelar
            </Button>
            <Button variant={variant} size="sm" onClick={onConfirm} isLoading={isLoading}>
              {confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
