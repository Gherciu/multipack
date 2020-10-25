/* eslint-disable no-use-before-define */
import React from 'react'
import { CounterProps } from '../types'

const Counter: React.FC<CounterProps> = ({
  onDecrement,
  onIncrement,
  count,
}: CounterProps) => (
  <div>
    <button type='button' onClick={onDecrement}>
      -
    </button>
    <span>{count}</span>
    <button type='button' onClick={onIncrement}>
      +
    </button>
  </div>
)

export default Counter
