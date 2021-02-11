const { jestConfig, mergeConfigs } = require('@episclera/configkit')

module.exports = mergeConfigs(jestConfig, {
  modulePathIgnorePatterns: ['packages/multipack/generators/'],
})
