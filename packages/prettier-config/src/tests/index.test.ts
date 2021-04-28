import { format, check } from 'prettier'
import prettierConfig from '../index'

const rawCode =
  'const semi=1;\nconst singleQuote="text";\nconst trailingComma={[ a ]:"long text greater than 80chars long long text greater than 80chars"};'
const formattedCode = `const semi = 1\nconst singleQuote = 'text'\nconst trailingComma = {\n  [a]: 'long text greater than 80chars long long text greater than 80chars',\n}\n`

describe('prettierConfig', () => {
  it('Should correctly format provided code', () => {
    expect(format(rawCode, { ...prettierConfig, filepath: 'test.tsx' })).toBe(
      formattedCode,
    )
  })

  it('Should return true if provided code is formatted correctly', () => {
    expect(
      check(formattedCode, { ...prettierConfig, filepath: 'test.tsx' }),
    ).toBe(true)
  })

  it('Should return false if provided code is formatted incorrectly', () => {
    expect(check(rawCode, { ...prettierConfig, filepath: 'test.tsx' })).toBe(
      false,
    )
  })
})
