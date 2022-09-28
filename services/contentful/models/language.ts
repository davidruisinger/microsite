import contentful from 'contentful'

export interface ContentfulLanguage {
  countryCode?: string
  icon?: contentful.Asset
  isoCode?: string
  name?: string
}
