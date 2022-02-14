require('./styles.less')

import { LinkedinFilled, TwitterSquareFilled } from '@ant-design/icons'
import { Col, Icon, Menu, Row } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'

import IconArrowDown from '../../../assets/icons/small-down.svg'
import useIsClient from '../../../hooks/useIsClient'
import { useAvailableLanguages, useNavs } from '../../../hooks/useTranslation'
import { CustomLink } from '../../Elements'

const { SubMenu } = Menu

const Footer = () => {
  const { active: activeLanguage, languages } = useAvailableLanguages()
  const { footer } = useNavs()
  const subMenus = footer?.elementsCollection?.items
  const router = useRouter()
  const activeIcon = activeLanguage?.icon?.url
  const { isClient, key } = useIsClient()

  const switchLanguage = ({ key }) => {
    const { asPath, pathname, query } = router
    const locale = key === 'en-US' ? 'en' : key
    // change just the locale and maintain all other route information including href's query
    router.push({ pathname, query }, asPath, { locale })
  }

  if (!isClient) return null

  return (
    <footer className="page-footer" key={key}>
      <div className="container core">
        <Row type="flex">
          {subMenus &&
            subMenus.map((item, i) => (
              <Col className="footer-col" key={`footer-${i}`} md={6} xs={24}>
                <h5>{item.title}</h5>
                <ul>
                  {item.elementsCollection?.items.map((element, j) => {
                    return (
                      <li key={`link-${i}-${j}`}>
                        <CustomLink slug={element.slug} url={element.url}>
                          {element.title}
                        </CustomLink>
                      </li>
                    )
                  })}
                </ul>
              </Col>
            ))}

          <Col className="footer-col" md={5} xs={24}>
            <h5>Social</h5>
            <a
              className="social-link"
              href="https://www.linkedin.com/company/leaders-for-climate-action/"
            >
              <LinkedinFilled />
            </a>
            <a className="social-link" href="https://twitter.com/Leaders4CA">
              <TwitterSquareFilled />
            </a>
            <h5>Powered by</h5>

            <div style={{ marginTop: '20px' }}>
              <a
                href="https://www.contentful.com/"
                rel="nofollow noopener noreferrer"
                target="_blank"
              >
                <img
                  alt="Powered by Contentful"
                  src="https://images.ctfassets.net/fo9twyrwpveg/44baP9Gtm8qE2Umm8CQwQk/c43325463d1cb5db2ef97fca0788ea55/PoweredByContentful_LightBackground.svg"
                  style={{ maxWidth: '100px', width: '100%' }}
                />
              </a>
            </div>
          </Col>
        </Row>
        <Row
          style={{
            margin: '50px 0 0',
            textAlign: 'center',
          }}
        >
          <Col xs={24}>
            <div
              style={{
                display: 'inline-block',
                margin: '12px',
                verticalAlign: 'top',
              }}
            >
              ©LFCA Umweltschutz e.V. 2020
            </div>

            <Menu
              onClick={switchLanguage}
              style={{
                display: 'inline-block',
                maxWidth: '200px',
              }}
            >
              <SubMenu
                className="lang-submenu"
                key={'lang-switcher'}
                title={
                  <span className="submenu-title lang">
                    <img src={activeIcon} />
                    {activeLanguage?.name}
                    <Icon component={IconArrowDown} />
                  </span>
                }
              >
                {languages.map((language) => {
                  return (
                    <Menu.Item key={language.isoCode}>
                      <img
                        alt={language.isoCode}
                        src={language.icon && language.icon.url}
                        style={{ marginRight: '10px' }}
                      />
                      {language.name}
                    </Menu.Item>
                  )
                })}
              </SubMenu>
            </Menu>
          </Col>
        </Row>
      </div>
    </footer>
  )
}

export default Footer
