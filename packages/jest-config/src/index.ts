/* istanbul ignore file */
import { JestConfig } from '../types'

/* istanbul ignore next */
const jestConfig: JestConfig = {
  collectCoverageFrom: ['packages/**/*.(ts|tsx)'],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
  testRegex: 'tests/.*\\.test\\.(ts|tsx)$',
  preset: 'ts-jest',
}

/* istanbul ignore next */
export default jestConfig
