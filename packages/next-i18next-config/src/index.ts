/* istanbul ignore file */
import { NextI18NextConfig, I18N } from '../types'

/* istanbul ignore next */
const i18n: I18N = {
  defaultLocale: 'en',
  locales: ['en'],
}

/* istanbul ignore next */
const nextI18NextConfig: NextI18NextConfig = {
  i18n,
}

/* istanbul ignore next */
export { i18n }

/* istanbul ignore next */
export default nextI18NextConfig
