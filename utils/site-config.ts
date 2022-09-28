export const siteConfig = {
  author: 'Timo Müller', // Author for RSS author segment and SEO schema
  authorUrl: '', // URL used for author and publisher schema, can be a social profile or other personal site
  backgroundColor: '#e9e9e9', // Used for Offline Manifest
  copyright: 'Copyright © 2020 Leaders for Climate Action', // Copyright string for the RSS feed
  defaultLangKey: 'en',
  googleTagManagerID: 'GTM-P8R7SPM', // GTM tracking ID.
  publisher: 'LFCA Umweltschutz e.V.', // Organization name used for SEO schema
  shareImage: '/img/og_image_default.jpg', // Open Graph Default Share Image. 1200x1200 is recommended
  shareImageHeight: 600, // Change to the height of your default share image
  shareImageWidth: 900, // Change to the width of your default share image
  shortTitle: 'LFCA', // Used for App manifest e.g. Mobile Home Screen
  siteDescription:
    'A global community that drives climate action in organizations & beyond.',
  siteLogo: '/logos/logo-512.png', // Logo used for SEO, RSS, and App manifest
  siteTitle: 'We take Climate Action',
  siteTitleAlt: 'We take Climate Action', // This allows an alternative site title for SEO schema.
  siteUrl: process.env.NEXT_PUBLIC_URL, // Site domain. Do not include a trailing slash! If you wish to use a path prefix you can read more about that here: https://www.gatsbyjs.org/docs/path-prefix/
  themeColor: '#121212', // Used for Offline Manifest
  userTwitter: 'Leaders4CA', // Change for Twitter Cards
}
