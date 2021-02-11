/* istanbul ignore file */
import useCounter from './useCounter'
import Counter from './Counter'

import { MultipackWithReact } from '../types'

const multipackWithReact: MultipackWithReact = {
  useCounter,
  Counter,
}

export { useCounter, Counter }
export default multipackWithReact
