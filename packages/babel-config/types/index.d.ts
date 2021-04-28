export interface BabelConfigPart {
  [key: string]: any
}

export interface BabelConfig {
  commonBabelConfig: BabelConfigPart
  nextBabelConfig: BabelConfigPart
}

// package exports
export const commonBabelConfig: BabelConfigPart
export const nextBabelConfig: BabelConfigPart

declare const babelConfig: BabelConfig

export default babelConfig
