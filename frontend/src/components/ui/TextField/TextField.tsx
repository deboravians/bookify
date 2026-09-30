import { useId, type InputHTMLAttributes, type ReactNode, type Ref } from 'react'
import styles from './TextField.module.css'

export type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
  endAdornment?: ReactNode
  ref?: Ref<HTMLInputElement>
}

export function TextField({
  label,
  error,
  endAdornment,
  required,
  id,
  className,
  ref,
  ...inputProps
}: TextFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const errorId = `${inputId}-error`

  return (
    <div className={[styles.field, className].filter(Boolean).join(' ')}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
        {required && (
          <span className={styles.required} aria-hidden>
            {' '}*
          </span>
        )}
      </label>

      <div className={styles.control} data-invalid={Boolean(error)}>
        <input
          ref={ref}
          id={inputId}
          className={styles.input}
          aria-required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          {...inputProps}
        />
        {endAdornment && <div className={styles.adornment}>{endAdornment}</div>}
      </div>

      {error && (
        <p id={errorId} className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
