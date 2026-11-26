export function trimText(value: string) {
  return value.trim()
}

export function requiredText(message: string) {
  return {
    required: message,
    setValueAs: trimText,
    validate: (value: string) => value.trim().length > 0 || message,
  }
}

export const phoneRules = {
  ...requiredText('Informe o telefone.'),
  pattern: {
    value: /^(?:\(\d{2}\)|\d{2})\s?\d{4,5}-?\d{4}$/,
    message: 'Informe um telefone com DDD e 10 ou 11 dígitos.',
  },
}

export const cpfRules = {
  ...requiredText('Informe o CPF.'),
  pattern: {
    value: /^(?:\d{11}|\d{3}\.\d{3}\.\d{3}-\d{2})$/,
    message: 'Informe um CPF com 11 dígitos (ex.: 223.456.789-00).',
  },
}
