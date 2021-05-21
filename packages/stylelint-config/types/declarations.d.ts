type Lint = (options: {
  code?: string
  codeFilename?: string
  config: { [key: string]: any }
  configBasedir?: string
  formatter?: string
  files?: string
  syntax?: string
}) => Promise<{
  errored: boolean
}>

declare module 'stylelint' {
  export const lint: Lint

  const content: {
    lint: Lint
  }
  export default content
}
