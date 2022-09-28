import { Cloudinary, Layer } from 'cloudinary-core'

const IMAGE_URL = 'Backgrounds/linkedin-wtca_xh4dra.jpg'

const getImageName = (image: string) => {
  const imageUrlParts = image.split('/')
  return imageUrlParts[imageUrlParts.length - 1] || image
}

export const createCompanySharingImage = (companyLogoUrl: string) => {
  // create custom sharing image
  const cl = new Cloudinary({
    cloud_name: 'dhpk1grmy',
    secure: true,
  })

  const imageName = getImageName(companyLogoUrl)
  return cl.url(IMAGE_URL, {
    transformation: [
      {
        crop: 'fill',
        gravity: 'south',
        height: 630,
        width: 1200,
      },
      {
        crop: 'pad',
        height: 130,
        overlay: new Layer().publicId(`logos/${imageName}`).toString(),
        width: 130,
      },
      {
        flags: 'layer_apply',
        gravity: 'south_east',
        radius: 20,
        x: 45,
        y: 65,
      },
    ],
  })
}
