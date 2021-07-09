import { JestConfig } from '../types'

const jestConfig: JestConfig = {
  collectCoverageFrom: ['packages/**/*.(ts|tsx)'],
  coverageThreshold: {
    /**
     * coverage values was set after reading some articles https://testing.googleblog.com/2020/08/code-coverage-best-practices.html and https://www.bullseye.com/minimum.html#:~:text=Code%20coverage%20of%2070%2D80,higher%20than%20for%20system%20testing.
     * 100% leads to a false sense of security and it involves changes in codebase related to testing things to cover all
     */
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
  /**
   * clearing all mocks before each individual test (useful when using spy functions)
   */
  clearMocks: true,
  /**
   * resetting all modules before each individual test (useful when using dynamic imports functions)
   */
  resetModules: true,
  /**
   * Using this testRegex because tests should be in a different folder but not alongside to source code it is more meaningful
   */
  testRegex: 'tests/.*\\.test\\.(ts|tsx)$',
  preset: 'ts-jest',
  /**
   * From version 27 the default testEnvironment is "node" but not "jsdom" which makes a lot of projects generated from multipack to fail in test step
   * because most projects even "node" related depends on some DOM methods
   * See more info https://jestjs.io/blog/2021/05/25/jest-27#flipping-defaults
   */
  testEnvironment: 'jsdom',
}

export default jestConfig
