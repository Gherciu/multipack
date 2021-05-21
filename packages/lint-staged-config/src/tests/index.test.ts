import path from 'path'
import lintStaged from 'lint-staged'
import lintStagedConfig from '../index'

describe('lintStagedConfig', () => {
  it('Should return success if no staged files provided', async () => {
    const success = await lintStaged({
      config: lintStagedConfig,
      cwd: path.resolve(__dirname, '..'),
      quiet: true,
    })

    expect(success).toBeTruthy()
  })
})
