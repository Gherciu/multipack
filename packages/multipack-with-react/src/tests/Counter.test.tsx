/* eslint-disable import/no-extraneous-dependencies, no-use-before-define */
import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import useCounter from '../useCounter'
import Counter from '../Counter'

describe('Counter', () => {
  it('should render corect without errors', () => {
    const Component: React.FC = () => {
      const { count, increment, decrement } = useCounter(21)
      return (
        <div data-testid='test'>
          <Counter
            count={count}
            onIncrement={increment}
            onDecrement={decrement}
          />
        </div>
      )
    }
    const { getByTestId } = render(<Component />)

    expect(getByTestId('test').innerHTML).toMatch('21')
  })
})
