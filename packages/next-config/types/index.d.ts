export interface ConfigToMerge {
  webpack?: (config: { [key: string]: any }) => { [key: string]: any }
  [key: string]: any
}

export type TWithPlugins = (
  phase?: string,
  defaultConfig?: ConfigToMerge,
) => ConfigToMerge

export type NextConfig = (
  plugins?: any[],
  config?: ConfigToMerge,
) => TWithPlugins

// package exports
declare const nextConfig: NextConfig

export default nextConfig
