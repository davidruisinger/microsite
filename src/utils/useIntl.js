import { useStaticQuery, graphql } from "gatsby";
import { isBrowser, findLangKeyByUrl } from "./";

const useIntl = () => {
  const urlLangCode = isBrowser() && findLangKeyByUrl(window.location.pathname);

  const { contentfulMetaData: data } = useStaticQuery(graphql`
    query {
      contentfulMetaData(name: { eq: "Main" }) {
        languages {
          name
          isoCode
          countryCode
          icon {
            file {
              url
            }
          }
        }
      }
    }
  `);
  const { languages } = data;
  const language = languages.find((lang) => lang.isoCode === urlLangCode);
  return language || languages.find((lang) => lang.countryCode === "en");
};

export default useIntl;
