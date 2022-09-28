declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv {
      CONTENTFUL_APP_ACCESS_TOKEN: string
      CONTENTFUL_APP_SPACE_ID: string
      CONTENTFUL_BADGE_ACCESS_TOKEN: string
      CONTENTFUL_BADGE_SPACE_ID: string
      CONTENTFUL_ENVIRONMENT: string
      CONTENTFUL_HOST: string
      LFCA_GQL_API_ADMIN_TOKEN: string
      LFCA_GQL_API_URL: string
      NEXT_PUBLIC_MICROSITE_ACHIEVEMENT_ID: string
      NEXT_PUBLIC_URL: string
    }
  }
}

export {}
