import runRules from './runRules'
import { TLinter } from '../../types'

/**
 *  Used to run linterConfigs
 * @param linterConfig - linterConfig
 */
/* istanbul ignore next */
const linter: TLinter = async linterConfig => {
  const linterConfigRules =
    typeof linterConfig.rules === 'function'
      ? linterConfig.rules()
      : linterConfig.rules

  await runRules(linterConfigRules)
}

export default linter
