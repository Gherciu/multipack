import path from 'path'
import { LinterConfig } from '../../../types'

/* istanbul ignore next */
const workspaceLinterConfig: LinterConfig = {
  rules: () => {
    return [
      {
        type: 'files-exists',
        name: 'multipack-structure',
        description: ({ fileName }) =>
          `"${fileName}" file should be present in a Multipack workspace`,
        files: [path.join(process.cwd(), './lerna.json')],
      },
      {
        type: 'match',
        name: 'npm-workspace-scripts',
        description: ({ fileName, pattern }) =>
          `Multipack requires that the file "${fileName}" to contain "${pattern.source}" script`,
        pattern: /build:packages/g,
        files: [path.join(process.cwd(), './package.json')],
      },
    ]
  },
}

export default workspaceLinterConfig
