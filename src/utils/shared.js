const { defaultLangKey } = require("./siteConfig");
// functions that are shared between gatsby node js code
// and components, need to be written in module.export way
const getI18nPrefix = (locale) => {
  if (locale !== defaultLangKey) {
    const countryCode = locale.slice(-2).toLowerCase();
    return `${countryCode}`;
  } else return ``;
};

exports.getI18nPrefix = getI18nPrefix;
