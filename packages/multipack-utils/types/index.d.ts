export interface Config {
  [key: string]: any
}

export type TMergeConfigs = (
  initialConfig: Config,
  ...mergeConfig: Config[]
) => Config

export interface MultipackUtils {
  mergeConfigs: TMergeConfigs
}

// package exports
export const mergeConfigs: TMergeConfigs

declare const multipackUtils: MultipackUtils

export default multipackUtils
