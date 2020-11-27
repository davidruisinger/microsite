import React from "react";
import Helmet from "react-helmet";
import favicon from "../../images/favicon.ico";
import config from "../../utils/siteConfig";
import { CookiesProvider } from "react-cookie";
import CookieConsent from "../CookieConsent";
import PageHeader from "./PageHeader";
import PageFooter from "./PageFooter";
import IsMobileProvider from "../../utils/IsMobileProvider";
import { findLangKeyByUrl } from "../../utils";
// Main styles
import "../../assets/less/styles.less";

const Template = ({ children, location, activeCompany }) => {
  const langKey = findLangKeyByUrl(location.pathname);

  return (
    <IsMobileProvider>
      <div className="siteRoot">
        <Helmet>
          <title>{config.siteTitle}</title>
          <meta charSet="utf-8" />
          <link rel="icon" href={favicon} />
        </Helmet>

        <>
          <div className="siteContent">
            <PageHeader langKey={langKey} activeCompany={activeCompany} />
            {children}
            <CookieConsent
              cookieValue="consent"
              declineCookieValue="declined"
              buttonText="I accept"
              declineButtonText="Decline"
              cookieName="cookie_consent"
            >
              <div className="title">Cookie Settings </div>
              <div className="description">
                {`While Cookies won't save our planet, they do help us to measure
                our reach & impact. Can we set the following Cookies?`}
              </div>
            </CookieConsent>
          </div>
          <PageFooter langKey={langKey} />
        </>
      </div>
    </IsMobileProvider>
  );
};

const withCookieTemplate = (props) => (
  <CookiesProvider>
    <Template {...props} />
  </CookiesProvider>
);

export default withCookieTemplate;
