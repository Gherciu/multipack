type Lint = (options: {
  code: string
  config: { [key: string]: any }
  formatter?: string
}) => Promise<{
  errored: boolean
  maxWarningsExceeded: { foundWarnings: number }
}>

declare module 'stylelint' {
  export const lint: Lint

  const content: {
    lint: Lint
  }
  export default content
}
