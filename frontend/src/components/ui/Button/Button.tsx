import type { ButtonHTMLAttributes } from 'react'
import { LoaderCircle } from 'lucide-react'
import styles from './Button.module.css'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean
  fullWidth?: boolean
}

export function Button({
  isLoading = false,
  fullWidth = false,
  disabled,
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  const classes = [styles.button, fullWidth && styles.fullWidth, className]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...rest}
    >
      {isLoading && <LoaderCircle className={styles.spinner} size={16} aria-hidden />}
      {children}
    </button>
  )
}
