export interface WebpackConfigPart {
  [key: string]: any
}

export interface WebpackConfig {
  commonWebpackConfig: WebpackConfigPart
  packageWebpackConfig: WebpackConfigPart
}

// package exports
export const commonWebpackConfig: WebpackConfigPart
export const packageWebpackConfig: WebpackConfigPart

declare const webpackConfig: WebpackConfig

export default webpackConfig
