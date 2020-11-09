import React, { useState, useEffect } from "react";
import { Button } from "antd";
import Icon from "@ant-design/icons";
import { motion } from "framer-motion";
import IconCheck from "../../assets/icons/c-check.svg";
import IconRemove from "../../assets/icons/c-remove.svg";
import { useCookies } from "react-cookie";
import { isBrowser } from "../../utils";
import "./styles.less";

export const SAME_SITE_OPTIONS = {
  STRICT: "strict",
  LAX: "lax",
  NONE: "none",
};

const ConditionalWrapper = ({ condition, wrapper, children }) => {
  return condition ? wrapper(children) : children;
};

const CookieSelector = (props) => {
  return (
    <li className={props.isActive ? "active" : ""}>
      <Icon
        onClick={() => !props.disabled && props.toggleValue()}
        component={props.isActive ? IconCheck : IconRemove}
      />{" "}
      {props.title}
    </li>
  );
};

const CookieConsent = (props) => {
  const [visible, setVisible] = useState(false);
  const [hasFunctionalCookies, setHasFunctionalCookies] = useState(true);
  const [hasRecommendedCookies, setHasRecommendedCookies] = useState(true);
  // const [hasRecommendedCookies, setHasRecommendedCookies] = useState(true)
  const [cookies, setReactCookie] = useCookies();

  useEffect(() => {
    const { debug } = props;

    // if cookie undefined or debug
    if (getCookieValue() === undefined || debug) {
      setTimeout(() => {
        setVisible(true);
      }, 1000);
    }
  }, []);

  /**
   * Set a persistent accept cookie
   */
  const accept = () => {
    const { cookieName, cookieValue, onAccept } = props;

    setCookie(cookieName, cookieValue);

    // tell matomo to track from now on
    if (isBrowser() && window._paq) {
      window._paq.push(["setConsentGiven"]);
      // set matomo cookie to allow future
      // tracking for this visitor
      window._paq.push(["rememberConsentGiven"]);
    }

    onAccept && onAccept();

    setVisible(false);
  };

  /**
   * Set a persistent decline cookie
   */
  const decline = () => {
    const { cookieName, declineCookieValue, onDecline } = props;

    setCookie(cookieName, declineCookieValue);

    onDecline && onDecline();

    setVisible(false);
  };

  /**
   * Get the legacy cookie name by the regular cookie name
   * @param {string} name of cookie to get
   */
  const getLegacyCookieName = (name) => {
    return `${name}-legacy`;
  };

  /**
   * Function to set the consent cookie based on the provided variables
   * Sets two cookies to handle incompatible browsers, more details:
   * https://web.dev/samesite-cookie-recipes/#handling-incompatible-clients
   */
  const setCookie = (cookieName, cookieValue) => {
    const { extraCookieOptions, expires, sameSite } = props;
    let { cookieSecurity } = props;

    if (cookieSecurity === undefined && isBrowser()) {
      cookieSecurity = window.location
        ? window.location.protocol === "https:"
        : true;
    }

    let cookieOptions = {
      expires,
      ...extraCookieOptions,
      sameSite,
      secure: cookieSecurity,
    };

    // Fallback for older browsers where can not set SameSite=None, SEE: https://web.dev/samesite-cookie-recipes/#handling-incompatible-clients
    if (sameSite === SAME_SITE_OPTIONS.NONE) {
      setReactCookie(
        getLegacyCookieName(cookieName),
        cookieValue,
        cookieOptions
      );
    }

    // set the regular cookie
    setReactCookie(cookieName, cookieValue, cookieOptions);
  };

  /**
   * Returns the value of the consent cookie
   * Retrieves the regular value first and if not found the legacy one according
   * to: https://web.dev/samesite-cookie-recipes/#handling-incompatible-clients
   */
  const getCookieValue = () => {
    const { cookieName } = props;

    let cookieValue = cookies[cookieName];

    // if the cookieValue is undefined check for the legacy cookie
    if (cookieValue === undefined) {
      cookieValue = cookies[getLegacyCookieName(cookieName)];
    }
    return cookieValue;
  };

  // // If the bar shouldn't be visible don't render anything.
  if (!visible) {
    return null;
  }

  const {
    buttonText,
    declineButtonText,
    buttonId,
    declineButtonId,
    overlay,
    ariaAcceptLabel,
    ariaDeclineLabel,
  } = props;

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <ConditionalWrapper
      condition={overlay}
      wrapper={(children) => <div className="cookie-overlay">{children}</div>}
    >
      <motion.div
        initial="hidden"
        variants={variants}
        transition={{ ease: "easeInOut", duration: 1 }}
        animate="visible"
        className="cookie-consent-banner"
      >
        <div className="cookie-content">
          {props.children}
          <div className="consent">
            <ul>
              <CookieSelector
                toggleValue={() =>
                  setHasFunctionalCookies(!hasFunctionalCookies)
                }
                disabled
                isActive={hasFunctionalCookies}
                title="Functional Cookies"
              />
              <CookieSelector
                toggleValue={() =>
                  setHasRecommendedCookies(!hasRecommendedCookies)
                }
                isActive={hasRecommendedCookies}
                title="Recommended Cookies"
              />
            </ul>
          </div>
        </div>

        <div className={`btn-wrapper`}>
          <Button
            key="acceptButton"
            type="primary"
            size="large"
            id={buttonId}
            aria-label={ariaAcceptLabel}
            onClick={() => {
              accept();
            }}
          >
            {buttonText}
          </Button>
          <Button
            key="declineButton"
            ghost
            type="primary"
            size="large"
            id={declineButtonId}
            aria-label={ariaDeclineLabel}
            onClick={() => {
              decline();
            }}
          >
            {declineButtonText}
          </Button>
        </div>
      </motion.div>
    </ConditionalWrapper>
  );
};

export default CookieConsent;
