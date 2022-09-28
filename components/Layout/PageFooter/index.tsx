import { Menu } from 'antd'
import { useRouter } from 'next/router'

import { useNavigations } from '../../../hooks'
import { contentfulNavigationToAntdMenuItems } from '../../../utils'
import { IntlSelector } from '../../IntlSelector'
import styles from './styles.module.less'

export const PageFooter = () => {
  const menu = useNavigations('footer')
  const { push, query } = useRouter()

  return (
    <footer className={styles['footer']}>
      <div className="container">
        <Menu
          items={contentfulNavigationToAntdMenuItems(menu)}
          mode="inline"
          onClick={({ key }) => {
            push(key)
          }}
          selectedKeys={[query.slug as string]}
        />
        <IntlSelector />
      </div>
    </footer>
  )
}
