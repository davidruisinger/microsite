import { Col, Row } from 'antd'
import classNames from 'classnames'
import { useMemo } from 'react'

import { useBlockById } from '../../hooks'
import { RootCategoriesDataProps } from '../../services/contentful/fetch-root-categories'
import { RootCategoryIcon } from '../ActionsList/RootCategoryIcon'
import styles from './styles.module.less'

export type FrameworkElementColors = 'yellow' | 'wine' | 'blue' | 'green'

interface FrameworkElementsProps {
  rootCategoriesData: RootCategoriesDataProps
}

interface FrameworkElementProps {
  descriptionKey: string
  key: string
  titleKey: string
}

interface FrameworkElementWithMetaData extends FrameworkElementProps {
  color: FrameworkElementColors
  iconUrl: string
  id: string
  name: string
}

const FRAMEWORK_ELEMENTS: FrameworkElementProps[] = [
  {
    descriptionKey: 'stepUpDescription',
    key: 'tree-stepup',
    titleKey: 'stepUpTitle',
  },
  {
    descriptionKey: 'impactDescription',
    key: 'tree-impact',
    titleKey: 'impactTitle',
  },
  {
    descriptionKey: 'transformDescription',
    key: 'tree-transform',
    titleKey: 'transformTitle',
  },
  {
    descriptionKey: 'influenceDescription',
    key: 'tree-influence',
    titleKey: 'influenceTitle',
  },
]

const FrameworkElement = ({
  element,
}: {
  element: FrameworkElementWithMetaData
}) => {
  const t: Record<string, string> = {
    impactDescription: useBlockById('impact.description'),
    impactTitle: useBlockById('impact.title'),
    influenceDescription: useBlockById('influence.description'),
    influenceTitle: useBlockById('influence.title'),
    stepUpDescription: useBlockById('stepup.description'),
    stepUpTitle: useBlockById('stepup.title'),
    transformDescription: useBlockById('transform.description'),
    transformTitle: useBlockById('transform.title'),
  }

  return (
    <div className={classNames(styles['framework-element'], element.color)}>
      <RootCategoryIcon
        color={element.color}
        iconUrl={element.iconUrl}
        inverse
        size="large"
      />
      <div className="title">{t[element.titleKey]}</div>
      <div className="description">{t[element.descriptionKey]}</div>
    </div>
  )
}

export const FrameworkElements = ({
  rootCategoriesData,
}: FrameworkElementsProps) => {
  const t = {
    description: useBlockById('framework.description'),
    superText: useBlockById('framework.supertext'),
    title: useBlockById('framework.title'),
  }

  const rootCategoryElements = useMemo(() => {
    return rootCategoriesData.categoryTree.map((c) => ({
      color: c.fields.color,
      iconUrl: c.fields.icon?.fields.file.url,
      id: c.fields.categoryId,
      name: c.fields.name,
      ...FRAMEWORK_ELEMENTS.find((e) => e.key === c.fields.categoryId),
    })) as FrameworkElementWithMetaData[]
  }, [rootCategoriesData])

  return (
    <div className={classNames('container', styles['framework-elements'])}>
      <header>
        <div className="super-text">{t.superText}</div>
        <h2 className="title">{t.title}</h2>
        <div className="description">{t.description}</div>
      </header>
      <Row className="content" gutter={24}>
        {rootCategoryElements.map((element) => (
          <Col key={element.key} md={12} style={{ display: 'flex' }} xs={24}>
            <FrameworkElement element={element} />
          </Col>
        ))}
      </Row>
    </div>
  )
}
