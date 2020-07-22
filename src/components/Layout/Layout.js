import React from "react";
import Helmet from "react-helmet";
import favicon from "../../images/favicon.ico";
import config from "../../utils/siteConfig";
import PageHeader from "./PageHeader";
import PageFooter from "./PageFooter";
import { LanguageSelector } from "../Elements";
// isMobile Provider
import IsMobileProvider from "../../utils/IsMobileProvider";
// intl
import { getCurrentLangKey, getLangs, getUrlForLang } from "ptz-i18n";
import { IntlProvider } from "react-intl";
import { getBrowserLanguage, isBrowser } from "../../utils";

// Main styles
import "../../assets/less/styles.less";

// Polyfills for old browsers
if (!Intl.PluralRules) {
  require("@formatjs/intl-pluralrules/polyfill");
  require("@formatjs/intl-pluralrules/dist/locale-data/de"); // Add locale data for de
}

if (!Intl.RelativeTimeFormat) {
  require("@formatjs/intl-relativetimeformat/polyfill");
  require("@formatjs/intl-relativetimeformat/dist/locale-data/de"); // Add locale data for de
}

const Template = ({
  children,
  header,
  data,
  location,
  inverse,
  activeCompany,
}) => {
  const url = location.pathname;
  const { langs, defaultLangKey } = data.site.siteMetadata.languages;
  const langKey = getCurrentLangKey(langs, defaultLangKey, url);
  const homeLink = `/${langKey}/`;
  const langsMenu = getLangs(langs, langKey, getUrlForLang(homeLink, url));

  let i18nMessages;
  try {
    i18nMessages = require(`../../data/messages/${langKey}`);
  } catch (e) {
    i18nMessages = require(`../../data/messages/${defaultLangKey}`);
  }

  // Check if cookie is set
  const browserLang = getBrowserLanguage();
  const differentLang = browserLang !== langKey;
  const hasBeenHere = isBrowser() && window.localStorage.getItem("hasBeenHere");

  return (
    <IntlProvider locale={langKey} messages={i18nMessages}>
      <IsMobileProvider>
        <div className="siteRoot">
          <Helmet>
            <title>{config.siteTitle}</title>
            <meta charSet="utf-8" />
            <link rel="icon" href={favicon} />
          </Helmet>

          <>
            <div className="siteContent">
              {/* {!hasBeenHere && differentLang && (
                  <LanguageSelector activeLang={browserLang} langs={langs} />
                )} */}
              <PageHeader
                inverse={inverse}
                langsMenu={langsMenu}
                layout={header}
                langKey={langKey}
                activeCompany={activeCompany}
              />
              {children}
            </div>
            <PageFooter langKey={langKey} />
          </>
        </div>
      </IsMobileProvider>
    </IntlProvider>
  );
};

export default Template;
