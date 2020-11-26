import { useStaticQuery, graphql } from "gatsby";
import { useCookies } from "react-cookie";

const useIntl = () => {
  // returns the ISO code based on the
  // stored firebase country cookie
  const [cookies] = useCookies();
  const countryCookie = cookies["firebase-country-override"] || "en";
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
  const language = languages.find((lang) => lang.countryCode === countryCookie);
  return language || languages.find((lang) => lang.countryCode === "en");
};

export default useIntl;
