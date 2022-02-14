require('./styles.less')

import Icon from '@ant-design/icons'
import { Button } from 'antd'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

import IconCheck from '../../assets/icons/c-check.svg'
import IconRemove from '../../assets/icons/c-remove.svg'
import { isBrowser } from '../../utils'

export const SAME_SITE_OPTIONS = {
  LAX: 'lax',
  NONE: 'none',
  STRICT: 'strict',
}

const ConditionalWrapper = ({ children, condition, wrapper }) => {
  return condition ? wrapper(children) : children
}

const CookieSelector = (props) => {
  return (
    <li className={props.isActive ? 'active' : ''}>
      <Icon
        component={props.isActive ? IconCheck : IconRemove}
        onClick={() => !props.disabled && props.toggleValue()}
      />{' '}
      {props.title}
    </li>
  )
}

const CookieConsent = (props) => {
  const [visible, setVisible] = useState(false)
  const [hasFunctionalCookies, setHasFunctionalCookies] = useState(true)
  const [hasRecommendedCookies, setHasRecommendedCookies] = useState(true)
  const [cookies, setReactCookie] = useCookies()

  /**
   * Returns the value of the consent cookie
   * Retrieves the regular value first and if not found the legacy one according
   * to: https://web.dev/samesite-cookie-recipes/#handling-incompatible-clients
   */
  const getCookieValue = React.useCallback(() => {
    const cookieName = props.cookieName

    let cookieValue = cookies[cookieName]

    // if the cookieValue is undefined check for the legacy cookie
    if (cookieValue === undefined) {
      cookieValue = cookies[getLegacyCookieName(cookieName)]
    }
    return cookieValue
  }, [cookies, props.cookieName])

  useEffect(() => {
    const debug = props.debug

    // if cookie undefined or debug
    if (getCookieValue() === undefined || debug) {
      setTimeout(() => {
        setVisible(true)
      }, 1000)
    }
  }, [getCookieValue, props.debug])

  /**
   * Set a persistent accept cookie
   */
  const accept = () => {
    const { cookieName, cookieValue, onAccept } = props

    setCookie(cookieName, cookieValue)

    // tell matomo to track from now on
    if (isBrowser() && window._paq) {
      window._paq.push(['setConsentGiven'])
      // set matomo cookie to allow future
      // tracking for this visitor
      window._paq.push(['rememberConsentGiven'])
    }

    onAccept && onAccept()

    setVisible(false)
  }

  /**
   * Set a persistent decline cookie
   */
  const decline = () => {
    const { cookieName, declineCookieValue, onDecline } = props

    setCookie(cookieName, declineCookieValue)

    onDecline && onDecline()

    setVisible(false)
  }

  /**
   * Get the legacy cookie name by the regular cookie name
   * @param {string} name of cookie to get
   */
  const getLegacyCookieName = (name) => {
    return `${name}-legacy`
  }

  /**
   * Function to set the consent cookie based on the provided variables
   * Sets two cookies to handle incompatible browsers, more details:
   * https://web.dev/samesite-cookie-recipes/#handling-incompatible-clients
   */
  const setCookie = (cookieName, cookieValue) => {
    const { expires, extraCookieOptions, sameSite } = props
    let { cookieSecurity } = props

    if (cookieSecurity === undefined && isBrowser()) {
      cookieSecurity = window.location
        ? window.location.protocol === 'https:'
        : true
    }

    let cookieOptions = {
      expires,
      ...extraCookieOptions,
      sameSite,
      secure: cookieSecurity,
    }

    // Fallback for older browsers where can not set SameSite=None, SEE: https://web.dev/samesite-cookie-recipes/#handling-incompatible-clients
    if (sameSite === SAME_SITE_OPTIONS.NONE) {
      setReactCookie(
        getLegacyCookieName(cookieName),
        cookieValue,
        cookieOptions
      )
    }

    // set the regular cookie
    setReactCookie(cookieName, cookieValue, cookieOptions)
  }

  // // If the bar shouldn't be visible don't render anything.
  if (!visible) {
    return null
  }

  const {
    ariaAcceptLabel,
    ariaDeclineLabel,
    buttonId,
    buttonText,
    declineButtonId,
    declineButtonText,
    overlay,
  } = props

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  return (
    <ConditionalWrapper
      condition={overlay}
      wrapper={(children) => <div className="cookie-overlay">{children}</div>}
    >
      <motion.div
        animate="visible"
        className="cookie-consent-banner"
        initial="hidden"
        transition={{ duration: 1, ease: 'easeInOut' }}
        variants={variants}
      >
        <div className="cookie-content">
          {props.children}
          <div className="consent">
            <ul>
              <CookieSelector
                disabled
                isActive={hasFunctionalCookies}
                title="Functional Cookies"
                toggleValue={() =>
                  setHasFunctionalCookies(!hasFunctionalCookies)
                }
              />
              <CookieSelector
                isActive={hasRecommendedCookies}
                title="Recommended Cookies"
                toggleValue={() =>
                  setHasRecommendedCookies(!hasRecommendedCookies)
                }
              />
            </ul>
          </div>
        </div>

        <div className={`btn-wrapper`}>
          <Button
            aria-label={ariaAcceptLabel}
            id={buttonId}
            key="acceptButton"
            onClick={() => {
              accept()
            }}
            size="large"
            type="primary"
          >
            {buttonText}
          </Button>
          <Button
            aria-label={ariaDeclineLabel}
            ghost
            id={declineButtonId}
            key="declineButton"
            onClick={() => {
              decline()
            }}
            size="large"
            type="primary"
          >
            {declineButtonText}
          </Button>
        </div>
      </motion.div>
    </ConditionalWrapper>
  )
}

export default CookieConsent
