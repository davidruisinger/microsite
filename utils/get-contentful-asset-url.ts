import { Asset } from 'contentful'

export const getContentfulAssetUrl = (asset?: Asset): string => {
  if (!asset) return ''
  return `https:${asset.fields.file.url}`
}
