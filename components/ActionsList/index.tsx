import { Col, Collapse, Row } from 'antd'
import { useMemo } from 'react'

import { RootCategoriesDataProps } from '../../services/contentful/fetch-root-categories'
import { CompanyActionFragment } from '../../services/lfca-backend/api/generated'
import { getCategoryMeta } from '../../utils/get-category-meta'
import { ActionItemHeader } from './ActionItemHeader'
import styles from './styles.module.less'
import { getCategoryOrder } from './utils'

const { Panel } = Collapse

interface ActionsListProps {
  actions: CompanyActionFragment[]
  rootCategoriesData: RootCategoriesDataProps
}

export const ActionsList = ({
  actions,
  rootCategoriesData,
}: ActionsListProps) => {
  const rootCategoryOrder = useMemo(
    () => getCategoryOrder(rootCategoriesData.categoryTree),
    [rootCategoriesData]
  )

  const sortedActions = useMemo(() => {
    return actions.sort((a, b) => {
      const categoryMetaA = getCategoryMeta(
        rootCategoriesData,
        a.categories[0]?.id
      )
      const categoryMetaB = getCategoryMeta(
        rootCategoriesData,
        b.categories[0]?.id
      )

      const valA = rootCategoryOrder[categoryMetaA?.fields?.categoryId]
      const valB = rootCategoryOrder[categoryMetaB?.fields?.categoryId]

      return valA - valB
    })
  }, [actions, rootCategoriesData, rootCategoryOrder])

  return (
    <Row className={styles['actions-list']} gutter={12}>
      {sortedActions.map((action) => {
        const rootCategoryMeta = getCategoryMeta(
          rootCategoriesData,
          action.categories[0]?.id
        )

        if (!rootCategoryMeta?.fields) return null

        return (
          <Col key={action.contentId} md={12} xs={24}>
            <Collapse accordion bordered={false} expandIconPosition="end">
              <Panel
                header={
                  <ActionItemHeader
                    action={action}
                    rootCategoryMeta={rootCategoryMeta}
                  />
                }
                key={action.contentId}
              >
                <div className="requirements-title">What does this mean?</div>
                <ul>
                  {action.requirements.map((requirement) => (
                    <li key={requirement.id}>{requirement.title}</li>
                  ))}
                </ul>
              </Panel>
            </Collapse>
          </Col>
        )
      })}
    </Row>
  )
}
