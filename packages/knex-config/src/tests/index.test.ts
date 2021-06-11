import path from 'path'
import { writeFile, unlink } from 'fs/promises'

describe('knexConfig', () => {
  it('Should load .env file depending on NODE_ENV and read from there necessary properties to build in the end correct db connection', async () => {
    const envFilePath = path.join(__dirname, `./.env.${process.env.NODE_ENV}`)
    const spyCwd = jest.spyOn(process, 'cwd')
    spyCwd.mockReturnValue(__dirname)

    await writeFile(
      envFilePath,
      'DATABASE_HOST = localhost\nDATABASE_PORT = 5432\nDATABASE_USERNAME = localUser\nDATABASE_PASSWORD = localPass\nDATABASE_NAME = localDB',
    )

    // Importing it dynamically because .env file also is created dynamically in this test and it can't read it initially
    const knexConfig = await import('../index')

    expect(knexConfig.default.connection).toMatchObject({
      host: 'localhost',
      port: '5432',
      user: 'localUser',
      password: 'localPass',
      database: 'localDB',
    })
    await unlink(envFilePath)
  })

  it('Should use process.env to build in the end correct db connection even if .env file is present', async () => {
    const envFilePath = path.join(__dirname, `./.env.${process.env.NODE_ENV}`)
    const spyCwd = jest.spyOn(process, 'cwd')
    spyCwd.mockReturnValue(__dirname)

    await writeFile(
      envFilePath,
      'DATABASE_HOST = localhost\nDATABASE_PORT = 5432\nDATABASE_USERNAME = localUser\nDATABASE_PASSWORD = localPass\nDATABASE_NAME = localDB',
    )

    process.env.DATABASE_HOST = 'rds.aws.com'
    process.env.DATABASE_PORT = '5432'
    process.env.DATABASE_USERNAME = 'rdsUser'
    process.env.DATABASE_PASSWORD = 'rdsPassword'
    process.env.DATABASE_NAME = 'rdsDB'

    // Importing it dynamically because .env file also is created dynamically in this test and it can't read it initially
    const knexConfig = await import('../index')

    expect(knexConfig.default.connection).toMatchObject({
      host: 'rds.aws.com',
      port: '5432',
      user: 'rdsUser',
      password: 'rdsPassword',
      database: 'rdsDB',
    })
    await unlink(envFilePath)
    // clearing process env
    process.env.DATABASE_HOST = undefined
    process.env.DATABASE_PORT = undefined
    process.env.DATABASE_USERNAME = undefined
    process.env.DATABASE_PASSWORD = undefined
    process.env.DATABASE_NAME = undefined
  })

  it('Should not throw errors if .env file are not found', async () => {
    const spyCwd = jest.spyOn(process, 'cwd')
    spyCwd.mockReturnValue('./unknownPath')

    // Importing it dynamically because .env file also is created dynamically in this test and it can't read it initially
    const knexConfig = await import('../index')

    expect(knexConfig.default).toBeTruthy()
  })
})
