import { Entry } from 'contentful'
import Image from 'next/image'

import { ContentfulCategoryTree } from '../../../services/contentful/models/category-tree'
import { CompanyActionFragment } from '../../../services/lfca-backend/api/generated'
import { RootCategoryIcon } from '../RootCategoryIcon'
import styles from './styles.module.less'

interface ActionHeaderItemProps {
  action: CompanyActionFragment
  rootCategoryMeta?: Entry<ContentfulCategoryTree>
}

export const ActionItemHeader = ({
  action,
  rootCategoryMeta,
}: ActionHeaderItemProps) => {
  return (
    <div className={styles['action-item-header']}>
      <div className="bg-image-wrapper">
        <Image
          alt={action.contentId}
          className="bg-image"
          layout="fill"
          objectFit="cover"
          src={action.heroImage?.url || ''}
        />
      </div>

      <div className="content">
        <div className="title">{action.title}</div>
        <div className="category">
          <RootCategoryIcon
            iconUrl={rootCategoryMeta?.fields.icon?.fields.file.url}
          />
          <span className="category-name">{rootCategoryMeta?.fields.name}</span>
        </div>
      </div>
    </div>
  )
}
