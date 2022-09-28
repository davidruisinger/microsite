import { RootCategoriesDataProps } from '../services/contentful/fetch-root-categories'

export const getCategoryMeta = (
  rootCategoriesData: RootCategoriesDataProps,
  firstCategoryId: string
) => {
  const rootCategory = rootCategoriesData.rootCategoryLookUp[firstCategoryId]
  const rootCategoryMeta = rootCategoriesData.lookUp[rootCategory]
  return rootCategoryMeta
}
