require('./styles.less')

import Icon, { UnorderedListOutlined } from '@ant-design/icons'
import { Badge, Drawer, Layout, List, Menu } from 'antd'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import IconArrowDown from '../../../assets/icons/small-down.svg'
import useIsClient from '../../../hooks/useIsClient'
import { useNavs } from '../../../hooks/useTranslation'
import { replaceVars } from '../../../utils'
import { useIsMobile } from '../../../utils/IsMobileProvider'
import { CustomLink, TopBar } from '../../Elements'

const { Header } = Layout
const { SubMenu } = Menu

const LeftMenu = (props) => (
  <div className="left-menu">
    <div className="logo">
      <CustomLink slug={'/'}>
        <div className="logo-wrapper" />
      </CustomLink>
    </div>
  </div>
)

const RightMenu = ({ activeCompany, activePath, items }) => {
  const router = useRouter()
  const isMobile = useIsMobile()
  const { isClient, key } = useIsClient()
  if (!isClient) return null

  return (
    <Menu
      className="right-menu"
      key={key}
      mode={isMobile ? 'inline' : 'horizontal'}
      selectedKeys={[activePath]}
    >
      {items &&
        items.map((item, i) =>
          item.elements ? (
            <SubMenu
              key={`sub-${i}`}
              title={
                <span className="submenu-title">
                  {item.title}
                  <Icon component={IconArrowDown} />
                </span>
              }
            >
              {item.elements.map((subItem, j) => (
                <Menu.Item key={`sub-sub-${j}`}>
                  <CustomLink slug={subItem.slug} url={subItem.url}>
                    {subItem.title}
                  </CustomLink>
                </Menu.Item>
              ))}
            </SubMenu>
          ) : (
            <Menu.Item key={`main-${i}`}>
              <CustomLink slug={item.slug} url={item.url}>
                {replaceVars(item.title, { company: activeCompany || '' })}
              </CustomLink>
            </Menu.Item>
          )
        )}

      <Menu.Item
        className="simple-menu-item"
        key="open-companies"
        onClick={() => router.push('/')}
      >
        <UnorderedListOutlined style={{ marginRight: '6px' }} />
        All Companies
      </Menu.Item>
    </Menu>
  )
}

const PageHeader = ({ activeCompany }) => {
  const { mainMenu } = useNavs()

  const menuItems = mainMenu?.elements || []

  const [open, setOpen] = useState(false)
  const isMobile = useIsMobile()
  const hamburgerClass = `hamburger hamburger--spin ${open && 'is-active'}`

  return (
    <Header className={'page-header'}>
      <TopBar />
      <div className="container">
        <nav className="menu-bar">
          <div className="menu-con">
            <LeftMenu />

            {activeCompany ? (
              <>
                <button
                  className={hamburgerClass}
                  onClick={() => setOpen(true)}
                  type="button"
                >
                  <span className="hamburger-box">
                    <span className="hamburger-inner" />
                  </span>
                </button>
                <RightMenu activeCompany={activeCompany} items={menuItems} />
                <Drawer
                  className="nav-drawer"
                  closable={false}
                  onClose={() => setOpen(false)}
                  placement="left"
                  visible={open}
                  width={isMobile ? '280px' : '400px'}
                >
                  <h2>Navigation</h2>
                  <RightMenu activeCompany={activeCompany} items={menuItems} />
                </Drawer>
              </>
            ) : null}
          </div>
        </nav>
      </div>
    </Header>
  )
}

export default PageHeader
