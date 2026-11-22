import type { ButtonHTMLAttributes } from 'react'
import { Link, type LinkProps } from 'react-router'
import { LoaderCircle } from 'lucide-react'
import styles from './Button.module.css'

type Variant = 'primary' | 'secondary' | 'subtle' | 'danger'
type Size = 'md' | 'sm'

type StyleProps = {
  variant?: Variant
  size?: Size
  fullWidth?: boolean
  className?: string
}

function getClassName({ variant = 'primary', size = 'md', fullWidth, className }: StyleProps) {
  return [styles.button, styles[variant], styles[size], fullWidth && styles.fullWidth, className]
    .filter(Boolean)
    .join(' ')
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  StyleProps & {
    isLoading?: boolean
  }

export function Button({
  variant,
  size,
  fullWidth,
  isLoading = false,
  disabled,
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={getClassName({ variant, size, fullWidth, className })}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...rest}
    >
      {isLoading && <LoaderCircle className={styles.spinner} size={16} aria-hidden />}
      {children}
    </button>
  )
}

type ButtonLinkProps = LinkProps & StyleProps

export function ButtonLink({ variant, size, fullWidth, className, ...rest }: ButtonLinkProps) {
  return <Link className={getClassName({ variant, size, fullWidth, className })} {...rest} />
}
