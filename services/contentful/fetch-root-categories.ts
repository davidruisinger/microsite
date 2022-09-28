import { Entry } from 'contentful'

import { getEntries } from './api'
import { ContentfulCategory } from './models'
import { ContentfulCategoryTree } from './models/category-tree'

export interface RootCategoryLookUpProps {
  [key: string]: string
}

export interface LookUpProps {
  [key: string]: Entry<ContentfulCategoryTree> | Entry<ContentfulCategory>
}

export interface RootCategoriesDataProps {
  lookUp: LookUpProps
  rootCategoryLookUp: RootCategoryLookUpProps
  categoryTree: Entry<ContentfulCategoryTree>[]
}

const findCategoryChildren = (
  node: Entry<ContentfulCategoryTree> | Entry<ContentfulCategory>
): string[] => {
  return 'elements' in node.fields
    ? (node.fields.elements?.map((e) => {
        if ('elements' in e.fields) {
          return [...findCategoryChildren(e), e.fields.categoryId]
        }
        return e.fields.categoryId
      }) as string[])
    : []
}

export const fetchRootCategories = async () => {
  const response = await getEntries<ContentfulCategoryTree>('app', {
    content_type: 'categoryTree',
    'fields.categoryId[exists]': true,
    'fields.isRootCategory': true,
    include: 4,
    locale: 'en-US',
    order: '-fields.sortWeight',
  })

  const categoryTree = response.items

  // root category lookup to match colors to actions
  const rootCategoryLookUp: RootCategoryLookUpProps = {}
  for (const rootCategoryTree of categoryTree) {
    const categoryChildren = findCategoryChildren(rootCategoryTree).flat()
    for (const child of categoryChildren) {
      rootCategoryLookUp[child] = rootCategoryTree?.fields?.categoryId
    }
  }

  // wrapper to recursively traverse the tree
  const tree = {
    fields: {
      categoryId: 'root',
      elements: categoryTree,
      name: 'root',
    },
  }

  // helper to easily traverse tree and
  // build a lookUp object to find ancestors
  // without looping
  const lookUp: LookUpProps = {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const traverseTree = (node: any, parentId: string) => {
    node.parentId = parentId
    lookUp[node.fields.categoryId || ''] = node
    if ('elements' in node.fields && node.fields.elements) {
      for (let i = 0; i < node.fields.elements.length; i++) {
        const child = node.fields.elements[i]
        traverseTree(child, node.fields?.categoryId)
      }
    }
  }

  // // fill lookUp by recursively traversing the tree
  traverseTree(tree, 'root')

  return {
    categoryTree,
    lookUp,
    rootCategoryLookUp,
  } as RootCategoriesDataProps
}
