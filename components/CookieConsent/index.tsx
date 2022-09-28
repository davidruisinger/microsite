import { Button, Col, Row } from 'antd'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import { CONSENT_COOKIES, getCookie, setCookie } from '../../utils'
import { CookieSelector } from './CookieSelector'
import styles from './styles.module.less'

export const CookieConsent = () => {
  const [cookieState, setCookieState] = useState(
    CONSENT_COOKIES.reduce((acc, curr) => {
      acc[curr.name] = curr.isRequired ? true : false
      return acc
    }, {} as Record<string, boolean>)
  )
  const [visible, setVisible] = useState(false)

  // We show the banner when any of the required cookies has not been accepted, yet
  useEffect(() => {
    const hasAllMandatoryCookies = CONSENT_COOKIES.every((cookie) => {
      if (!cookie.isRequired) return true
      return !!getCookie(cookie.name)
    })

    // show consent banner if needed
    if (!hasAllMandatoryCookies) {
      setTimeout(() => {
        setVisible(true)
      }, 1000)
    }
  }, [])

  const accept = (all = false) => {
    if (all) {
      // Accept all cookies
      CONSENT_COOKIES.forEach((cookie) => {
        setCookie(cookie.name, 'true')
      })
    } else {
      // Accept only selected cookies
      Object.keys(cookieState).forEach((key) => {
        if (cookieState[key]) {
          setCookie(key, 'true')
        }
      })
    }

    setVisible(false)
  }

  if (!visible) {
    return null
  }

  return (
    <div className={styles['cookie-overlay']}>
      <motion.div
        animate="visible"
        className={styles['cookie-consent-banner']}
        initial="hidden"
        transition={{ duration: 1, ease: 'easeInOut' }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
      >
        <div className="cookie-content">
          <div className="title">Cookie Settings</div>
          <div className="description">
            While Cookies won&apos;t save our planet, they do help us to measure
            our reach &amp; impact. Can we set the following Cookies?
          </div>
          <div className="consent">
            <ul>
              {CONSENT_COOKIES.map((cookie) => (
                <CookieSelector
                  disabled={cookie.isRequired}
                  isActive={cookieState[cookie.name]}
                  key={cookie.name}
                  title={cookie.label}
                  toggleValue={() =>
                    setCookieState((v) => ({
                      ...v,
                      [cookie.name]: !cookieState[cookie.name],
                    }))
                  }
                />
              ))}
            </ul>
          </div>
        </div>

        <Row className="btn-wrapper" gutter={10}>
          <Col xs={10}>
            <Button
              block
              key="acceptAll"
              onClick={() => accept(true)}
              size="small"
              type="primary"
            >
              Accept all
            </Button>
          </Col>
          <Col xs={14}>
            <Button
              block
              ghost
              key="acceptSelected"
              onClick={() => accept()}
              size="small"
            >
              Accept selected
            </Button>
          </Col>
        </Row>
      </motion.div>
    </div>
  )
}
