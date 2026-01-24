// Form validation utilities
export const ValidationRules = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Please enter a valid email address",
  },
  phone: {
    pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
    message: "Please enter a valid phone number",
  },
  name: {
    pattern: /^[a-zA-Z\s]{2,50}$/,
    message: "Name must be 2-50 characters and contain only letters",
  },
  url: {
    pattern: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
    message: "Please enter a valid URL",
  },
} as const

export function validateEmail(email: string): boolean {
  return ValidationRules.email.pattern.test(email)
}

export function validatePhone(phone: string): boolean {
  return ValidationRules.phone.pattern.test(phone)
}

export function validateName(name: string): boolean {
  return ValidationRules.name.pattern.test(name)
}

export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, "")
    .slice(0, 1000)
}

export function validateFormData(data: Record<string, string>): {
  isValid: boolean
  errors: Record<string, string>
} {
  const errors: Record<string, string> = {}

  if (!data.name || !validateName(data.name)) {
    errors.name = ValidationRules.name.message
  }

  if (!data.email || !validateEmail(data.email)) {
    errors.email = ValidationRules.email.message
  }

  if (data.phone && !validatePhone(data.phone)) {
    errors.phone = ValidationRules.phone.message
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters"
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}
