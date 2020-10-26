/* eslint-disable import/no-extraneous-dependencies, no-use-before-define */

import React from 'react'
import { render } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks'
import useCounter from '../useCounter'

describe('useCounter', () => {
  it('should increment counter ', () => {
    const { result } = renderHook(() => useCounter())

    act(() => {
      result.current.increment()
    })

    expect(result.current.count).toBe(1)
  })

  it('should return corect initial count', () => {
    const { result } = renderHook(() => useCounter(21))

    expect(result.current.count).toBe(21)
  })

  it('should decrement counter', () => {
    const { result } = renderHook(() => useCounter())

    act(() => {
      result.current.decrement()
    })

    expect(result.current.count).toBe(-1)
  })

  it('should render corect without errors', () => {
    const Component: React.FC = () => {
      const { count } = useCounter(21)
      return <div data-testid='test'>{count}</div>
    }
    const { getByTestId } = render(<Component />)

    expect(getByTestId('test').innerHTML).toMatch('21')
  })
})
