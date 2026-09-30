import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { TextField, type TextFieldProps } from '../TextField/TextField'
import styles from './PasswordField.module.css'

type PasswordFieldProps = Omit<TextFieldProps, 'type' | 'endAdornment'>

export function PasswordField(props: PasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false)
  const Icon = isVisible ? EyeOff : Eye

  return (
    <TextField
      {...props}
      type={isVisible ? 'text' : 'password'}
      endAdornment={
        <button
          type="button"
          className={styles.toggle}
          onClick={() => setIsVisible((visible) => !visible)}
          aria-label={isVisible ? 'Ocultar senha' : 'Mostrar senha'}
          aria-pressed={isVisible}
        >
          <Icon size={16} aria-hidden />
        </button>
      }
    />
  )
}
