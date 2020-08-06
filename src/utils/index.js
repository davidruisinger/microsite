export const MOBILE_BREAKPOINT = 768;
export const TABLET_BREAKPOINT = 992;

export const CLOUDINARY_CLOUD_NAME = "dhpk1grmy";

export function getImageName(image) {
  const imageUrlParts = image.split("/");
  return imageUrlParts[imageUrlParts.length - 1] || image;
}

export function chunk(array, size) {
  const chunkedArr = [];
  for (let i = 0; i < array.length; i++) {
    const last = chunkedArr[chunkedArr.length - 1];
    if (!last || last.length === size) {
      chunkedArr.push([array[i]]);
    } else {
      last.push(array[i]);
    }
  }
  return chunkedArr;
}

export const colorMap = {
  orange: "#FFD3B6",
  lightOrange: "#f4f4f4",
  green: "#CDDFDB",
  blue: "#9DD3E5",
};

export const colorTextMap = {
  lightOrange: "#DF7935",
  lightGreen: "#217260",
  lightBlue: "#3F7A8E",
};

export function createMagicUnderline(string) {
  const htmlString = string.split("").map((letter) => {
    switch (letter) {
      case "[":
        return `<span class='magical-underline blue'>`;
      case "<":
        return `<span class='magical-underline blue'>`;
      case "{":
        return `<span class='magical-underline green'>`;
      case "}":
      case "]":
      case ">":
        return `</span>`;
      default:
        return letter;
    }
  });
  return htmlString.join("");
}

export function commentToHtml(htmlString) {
  console.log(htmlString);
  return htmlString.replace(/<!--/g, "").replace(/-->/g, "");
  // .replace(/\n/g, '<br />')
}

// @TODO: move this to one place together with adding langs
export function convertToCountryCode(langKey) {
  switch (langKey) {
    case "en-AU":
      return "au-AU";
    case "en-EN":
      return "eu-DE";
    case "de-DE":
      return "eu-DE";
    default:
      return "eu-DE";
  }
}

export function getCountryDetails(countryCodes) {
  return countryCodes.map((code) => {
    switch (code) {
      case "de-de":
      case "de-DE":
      case "eu-DE":
        return {
          icon: "eu-DE",
          name: "Germany",
          code: code,
        };
      case "au":
      case "en-AU":
      case "au-AU":
        return {
          icon: "au-AU",
          name: "Australia",
          code: code,
        };
      case "en-US":
        return {
          icon: "en-EN",
          name: "International",
          code: code,
        };
      case "as":
      case "as-IL":
        return {
          icon: "as-IL",
          name: "Israel",
          code: code,
        };
      case "eu-FR":
        return {
          icon: code,
          name: "France",
          code: code,
        };
      case "eu-ES":
        return {
          icon: code,
          name: "Spain",
          code: code,
        };
      case "eu-NO":
        return {
          icon: code,
          name: "Norway",
          code: code,
        };
      case "eu-DN":
        return {
          icon: code,
          name: "Denmark",
          code: code,
        };
      case "eu-SE":
        return {
          icon: code,
          name: "Sweden",
          code: code,
        };
      case "eu-EU":
      case "eu":
        return {
          icon: "eu-EU",
          name: "Europe",
          code: code,
        };
      case "all":
        return {
          icon: "global-flag",
          name: "Global",
          code: code,
        };
      default:
        return {
          name: code,
          code: code,
        };
    }
  });
}

export function getBrowserLanguage() {
  if (typeof navigator === `undefined`) {
    return "en-US";
  }

  const lang = navigator && navigator.language;
  if (!lang) return "en-US";

  return lang;
}

export const isBrowser = () => typeof window !== "undefined";

export const mapLangToRegion = (langKey) => {
  switch (langKey) {
    case "en-AU":
      return "au";
    case "de-de":
    case "de-DE":
      return "eu";
    default:
      return "all";
  }
};

export const sortBySortWeight = (a, b) => {
  // if sortWeight is defined, move to top
  const sortWeightA = a.sortWeight === undefined ? 0 : a.sortWeight;
  const sortWeightB = b.sortWeight === undefined ? 0 : b.sortWeight;
  if (sortWeightA > sortWeightB) {
    return -1;
  }
  if (sortWeightA < sortWeightB) {
    return 1;
  }
  return 0;
};

export const replaceVar = (string, variable) => {
  const replaced = string.replace(/\{(.*?)\}/, variable);
  return replaced;
};

export const mergeActions = (content, data) => {
  const merged = [];
  for (const dataItem of data) {
    // get corresponding content for item
    const contentItem = content[dataItem.uid];

    // extract requirements from data
    const { requirements: dataReqs, ...restData } = dataItem;
    const { requirements: contentReqs, ...restContent } = contentItem;

    const requirements = [];
    for (const dataReq of dataReqs) {
      requirements.push({
        ...contentReqs[dataReq.uid],
        value: dataReq,
      });
    }

    merged.push({
      ...restData,
      ...restContent,
      requirements,
    });
  }
  return merged;
};
