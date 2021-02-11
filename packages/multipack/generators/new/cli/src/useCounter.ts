import { useState, useCallback } from 'react'
import { TUseCounter } from '../types'

/* istanbul ignore next (no need to test initialValue) */
const useCounter: TUseCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue)

  const increment = useCallback(() => {
    setCount(count + 1)
  }, [count])

  const decrement = useCallback(() => {
    setCount(count - 1)
  }, [count])

  return { count, increment, decrement }
}

export default useCounter
