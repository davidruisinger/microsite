import React from "react";
import { Link } from "gatsby";
import { Link as ScrollLink } from "react-scroll";
import { defaultLangKey } from "../../../utils/siteConfig";
import { getI18nPrefix } from "../../../utils/shared";
import useIntl from "../../../utils/useIntl";

const CustomLink = ({ slug, url, children }) => {
  const locale = useIntl().isoCode; // { locale: 'de-DE' }
  const urlPrefix = getI18nPrefix(locale);

  const isInternal = slug && slug.length > 0;

  // if the slug links to an element on this page
  const isOnPage = slug && slug.indexOf("#") === 0;
  if (isOnPage) {
    const element = slug.substring(1);
    return (
      <ScrollLink smooth to={element}>
        {children}
      </ScrollLink>
    );
  }

  // make sure that root links to en-US go to root
  const isDefaultLang = urlPrefix === defaultLangKey;
  let customSlug = slug;
  if (slug === "/") {
    customSlug = "";
  }
  const linkTo = isDefaultLang
    ? `/${customSlug}`
    : `/${urlPrefix}/${customSlug}`;

  if (isInternal) {
    return <Link to={linkTo}>{children}</Link>;
  } else return <a href={url}>{children}</a>;
};

export default CustomLink;
