import { isBrowser } from './is-browser'

interface ConsentCookies {
  isRequired: boolean
  label: string
  name: string
}

export const CONSENT_COOKIES: ConsentCookies[] = [
  {
    isRequired: true,
    label: 'Functional Cookies',
    name: 'cookies.functional',
  },
  {
    isRequired: false,
    label: 'Statistical Cookies',
    name: 'cookies.statistical',
  },
]

export const setCookie = (name: string, value: string) => {
  if (!isBrowser()) return
  window.localStorage.setItem(name, value)
}

export const getCookie = (name: string) => {
  if (!isBrowser()) return null
  return window.localStorage.getItem(name)
}

export const deleteCookie = (name: string) => {
  if (!isBrowser()) return
  window.localStorage.removeItem(name)
}
