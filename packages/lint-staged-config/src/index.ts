/* istanbul ignore file */
import { LintStagedConfig } from '../types'

/* istanbul ignore next */
const lintStagedConfig: LintStagedConfig = {
  '*': ['npm run lint:packages:structure'],
  '*.(ts|tsx)': ['npm run lint:packages:scripts'],
  '*.(less)': ['npm run lint:packages:styles'],
}

/* istanbul ignore next */
export default lintStagedConfig
