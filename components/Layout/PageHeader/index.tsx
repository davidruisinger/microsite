import { Button, Drawer, Menu } from 'antd'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { useNavigations } from '../../../hooks'
import { contentfulNavigationToAntdMenuItems } from '../../../utils'
import { scrollToId } from '../../SectionWrapper'
import { StaticNavContainer } from './StaticNavContainer'
import styles from './styles.module.less'

export const LeftNav = () => {
  return (
    <div className={'nav-bar-left'}>
      <div className={styles['logo']} />
    </div>
  )
}

export const RightNav = () => {
  const { push, query } = useRouter()
  const [open, setOpen] = useState(false)

  const onMenuSelect = ({ key }: { key: string }) => {
    if (key.startsWith('http:')) window.open(key, '_blank')
    if (key.startsWith('#')) {
      scrollToId(key.slice(1))
      setOpen(false)
    } else push(key)
  }

  const menu = useNavigations('mainMenu')
  return (
    <div className={'nav-bar-right'}>
      <Button
        className={classNames(styles['hamburger'], styles['hamburger--spin'], {
          'is-active': open,
        })}
        onClick={() => setOpen(true)}
      >
        <span className="hamburger-box">
          <span className="hamburger-inner" />
        </span>
      </Button>

      <Drawer
        className={classNames('drawer-md', styles['nav-drawer'])}
        onClose={() => setOpen(false)}
        open={open}
        placement="left"
      >
        <Menu
          items={contentfulNavigationToAntdMenuItems(menu)}
          mode="vertical"
          onSelect={onMenuSelect}
          selectedKeys={[query.slug as string]}
        />
      </Drawer>
    </div>
  )
}

export const PageHeader = () => {
  return (
    <div className={styles['page-header']}>
      <StaticNavContainer type="absolute">
        <LeftNav />
        <RightNav />
      </StaticNavContainer>
    </div>
  )
}
