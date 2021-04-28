import { mergeConfigs } from '@episclera/multipack-utils'
import jestConfig from '@episclera/jest-config'
import eslintConfig from '@episclera/eslint-config'
import { commonBabelConfig, nextBabelConfig } from '@episclera/babel-config'
import {
  commonWebpackConfig,
  packageWebpackConfig,
} from '@episclera/webpack-config'
import prettierConfig from '@episclera/prettier-config'
import stylelintConfig from '@episclera/stylelint-config'
import commitlintConfig from '@episclera/commitlint-config'
import postcssConfig from '@episclera/postcss-config'
import tailwindConfig from '@episclera/tailwind-config'
import nextConfig from '@episclera/next-config'
import nextI18NextConfig from '@episclera/next-i18next-config'

import { Multipack } from '../types'

const multipack: Multipack = {
  // prettier
  prettierConfig,
  // stylelint
  stylelintConfig,
  // commitlint
  commitlintConfig,
  // jest
  jestConfig,
  // eslint
  eslintConfig,
  // postcss
  postcssConfig,
  // tailwind
  tailwindConfig,
  // babel
  commonBabelConfig,
  nextBabelConfig,
  // webpack
  commonWebpackConfig,
  packageWebpackConfig,
  // next
  nextConfig,
  nextI18NextConfig,
  // utils
  mergeConfigs,
}

export {
  // prettier
  prettierConfig,
  // stylelint
  stylelintConfig,
  // commitlint
  commitlintConfig,
  // jest
  jestConfig,
  // eslint
  eslintConfig,
  // postcss
  postcssConfig,
  // tailwind
  tailwindConfig,
  // babel
  commonBabelConfig,
  nextBabelConfig,
  // webpack
  commonWebpackConfig,
  packageWebpackConfig,
  // next
  nextConfig,
  nextI18NextConfig,
  // utils
  mergeConfigs,
}

export default multipack
