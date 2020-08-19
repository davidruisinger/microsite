import React from "react";
import Helmet from "react-helmet";
import favicon from "../../images/favicon.ico";
import config from "../../utils/siteConfig";
import PageHeader from "./PageHeader";
import PageFooter from "./PageFooter";
// isMobile Provider
import IsMobileProvider from "../../utils/IsMobileProvider";
// intl
import { getCurrentLangKey, getLangs, getUrlForLang } from "ptz-i18n";
import { IntlProvider } from "react-intl";

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

const Template = ({ children, metadata, location, activeCompany }) => {
  const url = location.pathname;
  const { langs, defaultLangKey } = metadata.languages;
  const langKey = getCurrentLangKey(langs, defaultLangKey, url);
  const homeLink = `/${langKey}/`;
  const langsMenu = getLangs(langs, langKey, getUrlForLang(homeLink, url));

  let i18nMessages;
  try {
    i18nMessages = require(`../../data/messages/${langKey}`);
  } catch (e) {
    i18nMessages = require(`../../data/messages/${defaultLangKey}`);
  }

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
              <PageHeader
                langsMenu={langsMenu}
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
