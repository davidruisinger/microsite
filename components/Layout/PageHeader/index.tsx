import { Avatar, Button, Drawer, Grid, Menu } from 'antd'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { useNavigations } from '../../../hooks'
import { CompanyDetailsFragment } from '../../../services/lfca-backend/api/generated'
import { contentfulNavigationToAntdMenuItems } from '../../../utils'
import { scrollToId } from '../../SectionWrapper'
import { StaticNavContainer } from './StaticNavContainer'
import styles from './styles.module.less'

const { useBreakpoint } = Grid

export const LeftNav = () => {
  return (
    <div className={'nav-bar-left'}>
      <div className={styles['logo']} />
    </div>
  )
}

export const RightNav = ({ company }: { company?: CompanyDetailsFragment }) => {
  const { push, query } = useRouter()
  const [open, setOpen] = useState(false)

  const onMenuSelect = ({ key }: { key: string }) => {
    if (key.startsWith('http:')) window.open(key, '_blank')
    if (key.startsWith('#')) {
      scrollToId(key.slice(1))
      setOpen(false)
    } else push(key)
  }

  const isDesktop = useBreakpoint()?.md
  const menu = useNavigations('mainMenu')
  return (
    <div className={'nav-bar-right'}>
      <div className="wrapper">
        {company && (
          <Button
            className="mini-profile"
            onClick={() => scrollToId('profile')}
          >
            <div className="logo-wrapper">
              <Avatar
                alt={company.name || 'logo'}
                className="company-logo"
                size={!isDesktop ? 62 : 40}
                src={company.logoUrl}
              />
            </div>
            <div className="content-wrapper">
              <div className="name">{company.name}</div>
              <div className="profile">Company Profile</div>
            </div>
          </Button>
        )}

        <Button
          className={classNames(
            styles['hamburger'],
            styles['hamburger--spin'],
            {
              'is-active': open,
            }
          )}
          onClick={() => setOpen(true)}
        >
          <span className="hamburger-box">
            <span className="hamburger-inner" />
          </span>
        </Button>
      </div>

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

export const PageHeader = ({
  company,
}: {
  company?: CompanyDetailsFragment
}) => {
  return (
    <div className={styles['page-header']}>
      <StaticNavContainer type="absolute">
        <LeftNav />
        <RightNav company={company} />
      </StaticNavContainer>
    </div>
  )
}
