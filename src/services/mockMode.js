export const MOCK_MODE_KEY = 'rta.mock.enabled'

export function isMockModeEnabled() {
  const envEnabled = import.meta.env.VITE_USE_MOCKS === 'true'

  if (typeof window === 'undefined') {
    return envEnabled
  }

  const savedValue = localStorage.getItem(MOCK_MODE_KEY)
  return envEnabled || savedValue === 'true'
}

export function setMockModeEnabled(value) {
  if (typeof window === 'undefined') {
    return value
  }

  localStorage.setItem(MOCK_MODE_KEY, String(value))
  return value
}
