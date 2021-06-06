export interface LintStagedConfig {
  '*': string[]
  '*.(ts|tsx)': string[]
  '*.(less)': string[]
}

// package exports
declare const lintStagedConfig: LintStagedConfig

export default lintStagedConfig
