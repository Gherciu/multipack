import log from '../utils/log'
import { TRunActions, ActionResult } from '../../types'
import copyAction from './actionsHandlers/copyAction'
import renameAction from './actionsHandlers/renameAction'
import moveAction from './actionsHandlers/moveAction'
import removeAction from './actionsHandlers/removeAction'

/**
 * Used to run generator actions
 * @param actions - array of actions to run
 */
/* istanbul ignore next */
const runActions: TRunActions = async actions => {
  const actionsRunResults: ActionResult[] = []

  // eslint-disable-next-line no-restricted-syntax
  for (const action of actions) {
    if (action.type === 'copy') {
      // eslint-disable-next-line no-await-in-loop
      const actionResult = await copyAction(action)
      actionsRunResults.push(...actionResult)
    }

    if (action.type === 'move') {
      // eslint-disable-next-line no-await-in-loop
      const actionResult = await moveAction(action)
      actionsRunResults.push(...actionResult)
    }

    if (action.type === 'rename') {
      // eslint-disable-next-line no-await-in-loop
      const actionResult = await renameAction(action)
      actionsRunResults.push(...actionResult)
    }

    if (action.type === 'remove') {
      // eslint-disable-next-line no-await-in-loop
      const actionResult = await removeAction(action)
      actionsRunResults.push(...actionResult)
    }

    if (action.type === 'transformTemplate') {
      log.warning(
        `transformTemplate actions are not yet implemented in multipack-cli`,
      )
    }

    if (action.type === 'modify') {
      log.warning(`modify actions are not yet implemented in multipack-cli`)
    }
  }

  if (actionsRunResults.every(({ error }) => !error)) {
    log.success('All generator actions passed with success')
  } else {
    log.error(
      `${actionsRunResults.filter(({ error }) => error)}/${
        actionsRunResults.length
      } generator actions failed`,
    )
  }
}

export default runActions
