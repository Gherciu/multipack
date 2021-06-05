import { readFile } from 'fs'
import cliSpinner from '../../utils/cliSpinner'
import { TMatchRule, LinterRuleResult } from '../../../types'

/**
 * Used to run match rules
 * @param rule - represents a match rule from linter config rules
 */
/* istanbul ignore next */
const matchRule: TMatchRule = async ({
  type,
  name,
  pattern,
  files,
  description,
}) => {
  const ruleResult = (await Promise.all(
    files.map(
      fileName =>
        new Promise(resolve => {
          const spinner = cliSpinner(
            `Checking if "${fileName}" content are matching the pattern "${pattern}"`,
          ).start()

          readFile(fileName, (error, data) => {
            if (error) {
              spinner.fail()
              resolve({ error })
            } else if (!pattern.test(data.toString())) {
              const ruleDescription =
                typeof description === 'function'
                  ? description({ fileName, pattern })
                  : description

              spinner.fail()
              resolve({
                error: new Error(`[${type}/${name}] - ${ruleDescription}`),
              })
            } else {
              spinner.succeed()
              resolve({ error: false })
            }
          })
        }),
    ),
  )) as LinterRuleResult[]

  return ruleResult
}

export default matchRule
