import { rename } from 'fs'
import cliSpinner from '../../utils/cliSpinner'
import { TRenameAction, ActionResult } from '../../../types'

/**
 * Used to run rename actions
 * @param action - represents a rename action from generator actions array
 */
/* istanbul ignore next */
const renameAction: TRenameAction = async action => {
  const actionResult = (await Promise.all(
    Object.entries(action.files).map(
      ([from, to]) =>
        new Promise(resolve => {
          const spinner = cliSpinner(
            `Renaming files from "${from}" to "${to}"`,
          ).start()

          rename(from, to, error => {
            if (error) {
              spinner.fail()
              resolve({ error })
            } else {
              spinner.succeed()
              resolve({ error: false })
            }
          })
        }),
    ),
  )) as ActionResult[]

  return actionResult
}

export default renameAction
