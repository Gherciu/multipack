import tailwindConfig from '../index'

// NOTE: this util is covered with tests in @episclera/weaver repo so no need to test here other logical things
describe('tailwindConfig', () => {
  it('Should correctly re-export packages', () => {
    expect(tailwindConfig).toBeDefined()
  })
})
