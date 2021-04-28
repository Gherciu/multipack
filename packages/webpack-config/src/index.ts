/* istanbul ignore file */
import commonWebpackConfig from './commonWebpackConfig'
import packageWebpackConfig from './packageWebpackConfig'
import { WebpackConfig } from '../types'

/* istanbul ignore next */
const webpackConfig: WebpackConfig = {
  commonWebpackConfig,
  packageWebpackConfig,
}

export { commonWebpackConfig, packageWebpackConfig }

/* istanbul ignore next */
export default webpackConfig
