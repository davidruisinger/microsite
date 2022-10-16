import { useRouter } from 'next/router'
import React, { createContext, useContext, useMemo } from 'react'

import { replaceVars } from '../utils'
import { ContentProps } from '../utils/server-only'

interface ContentContextProps
  extends Pick<ContentProps, 'blocks' | 'metaData'> {
  navigations: Record<string, ContentProps['navigations'][0]>
}

const ContentContext = createContext<ContentContextProps>({
  blocks: [],
  metaData: [],
  navigations: {},
})

interface ContentProviderProps extends ContentProps {
  children?: React.ReactNode
}

export const ContentProvider = ({
  blocks = [],
  children,
  metaData = [],
  navigations = [],
}: ContentProviderProps) => {
  const navigationsByMenuId = navigations.reduce((acc, curr) => {
    if (curr.fields.menuId) {
      acc[curr.fields.menuId] = curr
    }
    return acc
  }, {} as Record<string, typeof navigations[0]>)

  return (
    <ContentContext.Provider
      value={{
        blocks,
        metaData,
        navigations: navigationsByMenuId,
      }}
    >
      {children}
    </ContentContext.Provider>
  )
}

export const useBlockById = (
  id: string,
  vars?: Record<string, string>,
  wrapVarInSpan = false
) => {
  const context = useContext(ContentContext)
  const block = context.blocks.find((b) => b?.fields?.key === id)
  const value = block?.fields?.value || ''

  if (vars) return replaceVars(value, vars, wrapVarInSpan)
  return value
}

export const useLanguages = () => {
  const { asPath, locale, push } = useRouter()
  const context = useContext(ContentContext)

  const { availableLanguages, selectedLanguage } = useMemo(() => {
    const convertedLocale = locale === 'en' ? 'en-US' : locale

    const availableLanguages =
      context.metaData?.[0].fields.languages?.map((l) => l.fields) || []

    return {
      availableLanguages,
      selectedLanguage: availableLanguages.find(
        (l) => l.isoCode === convertedLocale
      ),
    }
  }, [locale, context.metaData])

  return {
    availableLanguages,
    selectedLanguage,
    switchLanguage: (isoCode: string) =>
      push(asPath, asPath, { locale: isoCode === 'en-US' ? 'en' : isoCode }),
  }
}

export const useNavigations = (key: string) => {
  const context = useContext(ContentContext)

  return context.navigations[key]
}
