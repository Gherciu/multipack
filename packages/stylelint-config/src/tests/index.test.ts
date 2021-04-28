import { lint } from 'stylelint'
import stylelintConfig from '../index'

describe('stylelintConfig', () => {
  // TODO: find a way how to properly test stylelintConfig because at the moment lint method only throws unknown errors
  it.skip('Should not return errors or warnings if provided code is formatted correctly', () => {
    expect.assertions(2)

    lint({
      code: '.a {\n  color:red;\n}\n',
      config: stylelintConfig,
      formatter: 'verbose',
    })
      .then(({ errored, maxWarningsExceeded: { foundWarnings } }) => {
        expect(errored).toBeFalsy()
        expect(foundWarnings).toBe(0)
      })
      .catch(error => {
        // Just to fail the test
        expect(true).toBe(error)
      })
  })
})
