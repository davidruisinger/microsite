export const MOBILE_BREAKPOINT = 768
export const TABLET_BREAKPOINT = 992

export const CLOUDINARY_CLOUD_NAME = 'dhpk1grmy'

export function getImageName(image) {
  const imageUrlParts = image.split('/')
  return imageUrlParts[imageUrlParts.length - 1] || image
}

export function chunk(array, size) {
  const chunkedArr = []
  for (let i = 0; i < array.length; i++) {
    const last = chunkedArr[chunkedArr.length - 1]
    if (!last || last.length === size) {
      chunkedArr.push([array[i]])
    } else {
      last.push(array[i])
    }
  }
  return chunkedArr
}

export const colorMap = {
  blue: '#9DD3E6',
  green: '#CDDFDB',
  lightOrange: '#f4f4f4',
  orange: '#FFD3B6',
}

export const colorTextMap = {
  lightBlue: '#3F7A8E',
  lightGreen: '#217260',
  lightOrange: '#DF7935',
}

export function createMagicUnderline(string) {
  const htmlString = string.split('').map((letter) => {
    switch (letter) {
      case '[':
        return `<span class='magical-underline blue'>`
      case '<':
        return `<span class='magical-underline blue'>`
      case '{':
        return `<span class='magical-underline green'>`
      case '}':
      case ']':
      case '>':
        return `</span>`
      default:
        return letter
    }
  })
  return htmlString.join('')
}

export function commentToHtml(htmlString) {
  return htmlString.replace(/<!--/g, '').replace(/-->/g, '')
  // .replace(/\n/g, '<br />')
}

export const setLangCookies = (setCookie, langKey) => {
  // if the full langKey is available, set it
  if (langKey.length > 2) {
    const countryCode = langKey.slice(-2).toLowerCase()
    setCookie('firebase-country-override', countryCode, { path: '/' })
  } else {
    // otherwise set only country code
    setCookie('firebase-country-override', langKey, { path: '/' })
  }
}

export const findLangKeyByUrl = (url) => {
  const { defaultLangKey } = require('../utils/siteConfig')
  if (!url) return defaultLangKey
  const urlParts = url.split('/')
  const urlPartLang = urlParts[1]
  if (urlPartLang.length === 2) {
    return urlPartLang
  } else {
    return defaultLangKey
  }
}

export const isBrowser = () => typeof window !== 'undefined'

export const sortBySortWeight = (a, b) => {
  // if sortWeight is defined, move to top
  const sortWeightA = a.sortWeight === undefined ? 0 : a.sortWeight
  const sortWeightB = b.sortWeight === undefined ? 0 : b.sortWeight
  if (sortWeightA > sortWeightB) {
    return -1
  }
  if (sortWeightA < sortWeightB) {
    return 1
  }
  return 0
}

export const replaceVars = (string, vars) => {
  for (var prop in vars) {
    if (!string) continue
    string = string.replace(new RegExp('{{' + prop + '}}', 'g'), vars[prop])
  }
  return string
}

export const mergeActions = (content, data) => {
  const merged = []
  for (const dataItem of data) {
    // get corresponding content for item
    const contentItem = content[dataItem.actionId]

    if (contentItem) {
      // extract requirements from data
      const { requirements: dataReqs, ...restData } = dataItem
      const { requirements: contentReqs, ...restContent } = contentItem

      const dataReqsAsObject =
        dataReqs &&
        dataReqs.reduce((acc, val) => {
          if (!acc[val.uid]) {
            acc[val.uid] = val
          }
          return acc
        }, {})

      const requirements = []
      for (const contentReqId in contentReqs) {
        const contentReq = contentReqs[contentReqId]
        const dataReq = dataReqsAsObject && dataReqsAsObject[contentReqId]
        requirements.push({
          ...dataReq,
          ...contentReq,
        })
      }

      merged.push({
        ...restData,
        ...restContent,
        requirements,
      })
    }
  }

  // filter items
  const filteredActions = merged.filter((action, index, self) => {
    const allKeys = self.map((action) => action.actionId)
    return allKeys.indexOf(action.actionId) === index && action.isComplete
  })

  // sort items
  const sorted = filteredActions.sort((a, b) =>
    a.order > b.order ? 1 : b.order > a.order ? -1 : 0
  )
  return sorted
}
