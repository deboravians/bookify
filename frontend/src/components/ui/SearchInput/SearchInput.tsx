import type { InputHTMLAttributes } from 'react'
import { Search } from 'lucide-react'
import styles from './SearchInput.module.css'

type SearchInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

export function SearchInput({ className, ...inputProps }: SearchInputProps) {
  return (
    <div className={[styles.control, className].filter(Boolean).join(' ')}>
      <Search className={styles.icon} size={14} aria-hidden />
      <input type="search" className={styles.input} {...inputProps} />
    </div>
  )
}
