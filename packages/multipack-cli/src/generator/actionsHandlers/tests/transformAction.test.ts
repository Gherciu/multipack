import { writeJSON, readJSON, remove } from 'fs-extra'
import path from 'path'
import transformAction from '../transformAction'

const testFilePath = path.join(__dirname, './test.json')

afterEach(async () => {
  await remove(testFilePath)
})

describe('transformAction', () => {
  it("Should return an error if provided file doesn't exists", async () => {
    const actionResult = await transformAction({
      type: 'transform',
      files: ['./unknownFile.txt'],
      data: {},
    })

    expect(actionResult[0]).toHaveProperty('error', expect.any(Error))
    expect(actionResult).toHaveLength(1)
  })

  it('Should transform file content using provided data and return no errors', async () => {
    await writeJSON(testFilePath, { name: '<%= name %>' })

    const actionResult = await transformAction({
      type: 'transform',
      files: [testFilePath],
      data: {
        name: 'testName',
      },
    })

    const testFileContent = (await readJSON(testFilePath)) as {
      [key: string]: any
    }

    expect(testFileContent).toHaveProperty('name', 'testName')
    expect(actionResult[0]).toHaveProperty('error', false)
    expect(actionResult).toHaveLength(1)
  })
})
