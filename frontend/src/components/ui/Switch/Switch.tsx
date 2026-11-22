import styles from './Switch.module.css'

type SwitchProps = {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
}

export function Switch({ label, checked, onChange, disabled }: SwitchProps) {
  return (
    <label className={styles.wrapper}>
      {label}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        className={styles.switch}
        onClick={() => onChange(!checked)}
        disabled={disabled}
      >
        <span className={styles.thumb} />
      </button>
    </label>
  )
}
