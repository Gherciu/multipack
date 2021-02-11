import React from 'react'

export type TUseCounter = (
  initialValue?: number,
) => {
  count: number
  increment: () => void
  decrement: () => void
}

export interface CounterProps {
  count: number
  onIncrement: () => void
  onDecrement: () => void
}

export interface MultipackWithReact {
  useCounter: TUseCounter
  Counter: React.FC<CounterProps>
}

// package exports
export const useCounter: TUseCounter
export const Counter: React.FC<CounterProps>

declare const multipackWithReact: MultipackWithReact

export default multipackWithReact
