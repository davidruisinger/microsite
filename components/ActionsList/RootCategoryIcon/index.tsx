import { Avatar } from 'antd'
import classNames from 'classnames'

import styles from './styles.module.less'

interface RootCategoryIconProps {
  color?: 'yellow' | 'wine' | 'blue' | 'green'
  iconUrl?: string
}

export const RootCategoryIcon = ({ color, iconUrl }: RootCategoryIconProps) => {
  return (
    <div className={styles['root-category-icon']}>
      <div className={classNames('icon', color)}>
        <Avatar alt="root-category" shape="square" size={18} src={iconUrl} />
      </div>
    </div>
  )
}
