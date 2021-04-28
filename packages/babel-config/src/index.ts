/* istanbul ignore file */
import commonBabelConfig from './commonBabelConfig'
import nextBabelConfig from './nextBabelConfig'
import { BabelConfig } from '../types'

/* istanbul ignore next */
const babelConfig: BabelConfig = {
  commonBabelConfig,
  nextBabelConfig,
}

export { commonBabelConfig, nextBabelConfig }

/* istanbul ignore next */
export default babelConfig
