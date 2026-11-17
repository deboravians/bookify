import type { InputHTMLAttributes, Ref } from 'react'
import { Search } from 'lucide-react'
import styles from './SearchInput.module.css'

type SearchInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  variant?: 'default' | 'pill'
  ref?: Ref<HTMLInputElement>
}

export function SearchInput({
  variant = 'default',
  className,
  ref,
  ...inputProps
}: SearchInputProps) {
  return (
    <div className={[styles.control, styles[variant], className].filter(Boolean).join(' ')}>
      <Search className={styles.icon} size={14} aria-hidden />
      <input ref={ref} type="search" className={styles.input} {...inputProps} />
    </div>
  )
}
