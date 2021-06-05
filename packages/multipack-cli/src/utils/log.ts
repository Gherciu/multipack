/* eslint-disable no-console */
import chalk from 'chalk'
import { Log } from '../../types'

/**
 * Used to log colored messages to console
 */
const log: Log = {
  info: message => {
    console.log(`${chalk.blue('\nInfo:')} ${message}`)
  },
  error: errorMessage => {
    console.log(
      `${chalk.red('\nError:')} ${
        typeof errorMessage === 'string'
          ? errorMessage
          : errorMessage.message.replace('Error:', '')
      }`,
    )
  },
  warning: message => {
    console.log(`${chalk.yellow('\nWarning:')} ${message}`)
  },
  success: message => {
    console.log(`${chalk.green('\nSuccess:')} ${message}`)
  },
}

export default log
