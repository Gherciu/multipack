export interface LintStagedConfig {
  '*.(ts|tsx)': string[]
  '*.(less)': string[]
}

// package exports
declare const lintStagedConfig: LintStagedConfig

export default lintStagedConfig
