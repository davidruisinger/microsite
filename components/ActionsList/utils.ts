import { RootCategoriesDataProps } from '../../services/contentful/fetch-root-categories'

export const getCategoryOrder = (
  categoryTree: RootCategoriesDataProps['categoryTree']
) => {
  return categoryTree.reduce((acc, val, i) => {
    if (!val.fields.isRootCategory) return acc
    acc[val.fields.categoryId] = i
    return acc
  }, {} as { [key: string]: number })
}
