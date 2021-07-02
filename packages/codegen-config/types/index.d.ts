export interface CodeGenConfig {
  schema: string
  generates: {
    /**
     * Hardcoded filename enum type to ensure that file name will be not changed
     */
    './api-types.d.ts': Record<string, any>
  }
  config: {
    scalars: Record<string, string>
  }
}

// package exports
declare const codeGenConfig: CodeGenConfig

export default codeGenConfig
