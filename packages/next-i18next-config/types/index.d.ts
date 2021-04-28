export interface I18N {
  defaultLocale: string
  locales: string[]
}

export interface NextI18NextConfig {
  i18n: I18N
}

// package exports
export const i18n: I18N
// main pack
declare const nextI18NextConfig: NextI18NextConfig

export default nextI18NextConfig
