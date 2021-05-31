import umdModule from '../index'

describe('umdModule', () => {
  it('Should return "Hello World!"', () => {
    expect(umdModule()).toBe('Hello World!')
  })
})
