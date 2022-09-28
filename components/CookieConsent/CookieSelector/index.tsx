import Icon from '@ant-design/icons'

import IconCheck from '../../../assets/icons/c-check.svg'
import IconRemove from '../../../assets/icons/c-remove.svg'
import styles from './styles.module.less'

interface CookieSelectorProps {
  disabled?: boolean
  isActive: boolean
  title: string
  toggleValue: () => void
}

export const CookieSelector = ({
  disabled,
  isActive,
  title,
  toggleValue,
}: CookieSelectorProps) => {
  return (
    <li className={`${styles['cookies-selector']} ${isActive ? 'active' : ''}`}>
      <Icon
        component={isActive ? IconCheck : IconRemove}
        onClick={() => !disabled && toggleValue()}
      />{' '}
      {title}
    </li>
  )
}
