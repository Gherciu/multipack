import getEndValueFromAny from '../getEndValueFromAny'

describe('getEndValueFromAny', () => {
  it('Should return correct value', () => {
    const expectedValue = 'expectedValue'

    expect(getEndValueFromAny(expectedValue, {})).toBe(expectedValue)
    expect(
      getEndValueFromAny(
        ({ expectedValue: valueToReturn }: { [key: string]: string }) =>
          valueToReturn,
        { expectedValue },
      ),
    ).toBe(expectedValue)
  })
})
