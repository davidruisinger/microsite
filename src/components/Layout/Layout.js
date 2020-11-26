import React, { useEffect } from "react";
import Helmet from "react-helmet";
import favicon from "../../images/favicon.ico";
import config from "../../utils/siteConfig";
import { CookiesProvider, useCookies } from "react-cookie";
import CookieConsent from "../CookieConsent";
import PageHeader from "./PageHeader";
import PageFooter from "./PageFooter";
// isMobile Provider
import IsMobileProvider from "../../utils/IsMobileProvider";
// intl
import { setLangCookies } from "../../utils";
import useIntl from "../../utils/useIntl";

// Main styles
import "../../assets/less/styles.less";

const Template = ({ children, metadata, location, activeCompany }) => {
  const urlParts = location.pathname && location.pathname.split("/");
  const urlPartLang = urlParts[1];
  const [cookies, setCookie] = useCookies();
  const countryCookie = cookies["firebase-country-override"];

  const langKey = useIntl().isoCode;
  const urlLangKey = urlPartLang.length > 0 ? urlPartLang.slice(-2) : "en";

  useEffect(() => {
    if (!countryCookie || langKey !== urlLangKey) {
      setLangCookies(setCookie, urlLangKey);
    }
  }, []);

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
                While Cookies won't save our planet, they do help us to measure
                our reach & impact. Can we set the following Cookies?
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
