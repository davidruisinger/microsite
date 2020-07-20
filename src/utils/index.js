export function isMobile () {
  if (typeof window !== 'undefined') {
    const isMobile = window.matchMedia('only screen and (max-width: 767px)')
    return isMobile.matches
  } else return false
}

export const CLOUDINARY_CLOUD_NAME = 'dhpk1grmy'

export const BASE_IMAGE = 'https://res.cloudinary.com/dhpk1grmy/image/upload/v1566849891/Logo/lfca_og_image_v1_bjmbkt.jpg'

export function getImageName (image) {
  const imageUrlParts = image.split('/')
  return imageUrlParts[imageUrlParts.length - 1] || image
}
