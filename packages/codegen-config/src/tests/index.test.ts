import path from 'path'
import { writeFile, unlink, access } from 'fs/promises'

const envFilePath = path.join(__dirname, `./.env.${process.env.NODE_ENV}`)

afterEach(async () => {
  const envExists = await access(envFilePath)
    .then(() => true)
    .catch(() => false)

  if (envExists) {
    await unlink(envFilePath)
  }
})

describe('codeGenConfig', () => {
  it('Should load .env file depending on NODE_ENV and read from there necessary properties to build in the end correct schema url if is a Next like project', async () => {
    const spyCwd = jest.spyOn(process, 'cwd')
    spyCwd.mockReturnValue(__dirname)

    await writeFile(
      envFilePath,
      'NEXT_PUBLIC_API_URL = https://api.example.com',
    )

    // Importing it dynamically because .env file also is created dynamically in this test and it can't read it initially
    const codeGenConfig = await import('../index')

    expect(codeGenConfig.default.schema).toBe('https://api.example.com/graphql')
  })

  it('Should load .env file depending on NODE_ENV and read from there necessary properties to build in the end correct schema url if is a Strapi like project', async () => {
    const spyCwd = jest.spyOn(process, 'cwd')
    spyCwd.mockReturnValue(__dirname)

    await writeFile(envFilePath, 'API_URL = http://localhost:3005')

    // Importing it dynamically because .env file also is created dynamically in this test and it can't read it initially
    const codeGenConfig = await import('../index')

    expect(codeGenConfig.default.schema).toBe('http://localhost:3005/graphql')
  })

  it('Should not throw errors if .env file are not found', async () => {
    const spyCwd = jest.spyOn(process, 'cwd')
    spyCwd.mockReturnValue('./unknownPath')

    let error: Error | null = null

    try {
      await import('../index')
    } catch (err) {
      error = err as Error
    }

    expect(error).toBeNull()
  })
})
