/* istanbul ignore file */
import { LintStagedConfig } from '../types'

/* istanbul ignore next */
const lintStagedConfig: LintStagedConfig = {
  '*.(ts|tsx)': ['npm run lint:packages'],
  '*.(less)': ['npm run lint:packages:styles'],
}

/* istanbul ignore next */
export default lintStagedConfig
