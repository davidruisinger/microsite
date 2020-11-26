const { defaultLangKey } = require("./siteConfig");
// functions that are shared between gatsby node js code
// and components, need to be written in module.export way
const getFirebaseI18nPrefix = (locale) => {
  if (locale !== defaultLangKey) {
    const countryCode = locale.slice(-2).toLowerCase();
    return `/ALL_${countryCode}`;
  } else return ``;
};

exports.getFirebaseI18nPrefix = getFirebaseI18nPrefix;
