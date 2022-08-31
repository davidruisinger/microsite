import { useRouter } from 'next/router'
import React, { createContext, useContext, useMemo } from 'react'

import { defaultLangKey } from '../utils/siteConfig'

const TranslationContext = createContext()

export const TranslationProvider = ({
  blocks = [],
  children,
  meta = [],
  navigations = [],
}) => {
  const { locale } = useRouter()
  const languages = useMemo(() => {
    const convertedLocale = locale === 'en' ? 'en-US' : locale

    const languages = meta[0]?.languages || []
    const active = languages.find((l) => convertedLocale === l.isoCode) || {}
    return {
      active,
      languages,
    }
  }, [locale, meta])

  const navs = useMemo(
    () =>
      navigations.reduce((acc, curr) => {
        acc[curr.menuId] = curr
        return acc
      }, {}),
    [navigations]
  )

  const getTranslation = (key) => {
    const translation = blocks.find((t) => t.key === key) || ''
    return translation.value
  }

  return (
    <TranslationContext.Provider
      value={{
        getTranslation: getTranslation,
        languages,
        locale,
        navs,
      }}
    >
      {children}
    </TranslationContext.Provider>
  )
}

export const useTranslation = (key) => {
  const context = useContext(TranslationContext)
  return context.getTranslation(key)
}

export const useLocalePrefix = () => {
  const context = useContext(TranslationContext)
  const { locale } = context
  if (defaultLangKey === locale) return ''
  else return locale
}

export const useAvailableLanguages = () => {
  const context = useContext(TranslationContext)
  return context.languages
}

export const useNavs = () => {
  const context = useContext(TranslationContext)
  return context.navs
}
