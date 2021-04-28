import mergeConfigs from '../mergeConfigs'

describe('mergeConfigs', () => {
  it('should merge correct two configs', () => {
    expect(mergeConfigs({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 })
    expect(mergeConfigs({ a: 1 }, { b: 2 }, { b: 3 })).toEqual({
      a: 1,
      b: 3,
    })
  })

  it('should merge correct two nested configs', () => {
    expect(
      mergeConfigs({ a: { b: 1, c: 3 } }, { a: { c: 1, d: { e: 1 } } }),
    ).toEqual({
      a: { b: 1, c: 1, d: { e: 1 } },
    })
  })

  it('should merge correct configs and take in priority the last value', () => {
    expect(mergeConfigs({ a: { b: 1 } }, { a: null })).toEqual({
      a: null,
    })
    expect(mergeConfigs({ a: { b: 1 } }, { a: false })).toEqual({
      a: false,
    })
    expect(mergeConfigs({ a: [1] }, { a: 21 })).toEqual({
      a: 21,
    })
    expect(mergeConfigs({ a: { b: { a: 1 } } }, { a: [21] })).toEqual({
      a: [21],
    })
  })

  it('should merge two configs with arrays and rewrite first array but not concat', () => {
    expect(mergeConfigs({ a: [1, 2, 3] }, { a: [2] })).toEqual({ a: [2] })
  })
})
