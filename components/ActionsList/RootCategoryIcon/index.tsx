import { Avatar } from 'antd'
import classNames from 'classnames'

import { FrameworkElementColors } from '../../FrameworkElements'
import styles from './styles.module.less'

interface RootCategoryIconProps {
  color?: FrameworkElementColors
  iconUrl?: string
  inverse?: boolean
  size?: 'small' | 'medium' | 'large'
}

export const RootCategoryIcon = ({
  color,
  iconUrl,
  inverse = false,
  size = 'medium',
}: RootCategoryIconProps) => {
  return (
    <div
      className={classNames(styles['root-category-icon'], size, {
        inverse: inverse,
      })}
    >
      <div className={classNames('icon', color)}>
        <Avatar
          alt="root-category"
          shape="square"
          size={size === 'large' ? 32 : 18}
          src={iconUrl}
        />
      </div>
    </div>
  )
}
