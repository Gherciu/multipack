declare module 'lint-staged' {
  const lintStaged: (options?: {
    config?: { [key: string]: any }
    cwd?: string
    /**
     * disable lint-staged’s own console output
     */
    quiet?: boolean
  }) => Promise<boolean>

  export default lintStaged
}
