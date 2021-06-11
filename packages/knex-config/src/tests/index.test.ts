import path from 'path'
import { writeFile, unlink } from 'fs/promises'

describe('knexConfig', () => {
  it('Should not throw errors if .env file are not found', async () => {
    const spyCwd = jest.spyOn(process, 'cwd')
    spyCwd.mockReturnValue('./unknownPath')

    // Importing it dynamically because .env file also is created dynamically in this test and it can't read it initially
    const knexConfig = await import('../index')

    expect(knexConfig.default).toBeTruthy()
  })

  it('Should load .env.development file and read from there necessary properties to build in the end correct "default/development" db connection', async () => {
    const envFilePath = path.join(__dirname, './.env.development')
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

  it('Should load .env.test file and read from there necessary properties to build in the end correct "test" db connection', async () => {
    const envFilePath = path.join(__dirname, './.env.test')
    const spyCwd = jest.spyOn(process, 'cwd')
    spyCwd.mockReturnValue(__dirname)

    await writeFile(envFilePath, 'DATABASE_FILENAME = ./tmp/db.sql')

    // Importing it dynamically because .env file also is created dynamically in this test and it can't read it initially
    const knexConfig = await import('../index')

    expect(knexConfig.default.test.connection).toMatchObject({
      filename: './tmp/db.sql',
    })
    await unlink(envFilePath)
  })
  it('Should use process.env to build in the end correct "production" db connection', async () => {
    process.env.DATABASE_HOST = 'rds.aws.com'
    process.env.DATABASE_PORT = '5432'
    process.env.DATABASE_USERNAME = 'rdsUser'
    process.env.DATABASE_PASSWORD = 'rdsPassword'
    process.env.DATABASE_NAME = 'rdsDB'

    // Importing it dynamically because .env file also is created dynamically in this test and it can't read it initially
    const knexConfig = await import('../index')

    expect(knexConfig.default.production.connection).toMatchObject({
      host: 'rds.aws.com',
      port: '5432',
      user: 'rdsUser',
      password: 'rdsPassword',
      database: 'rdsDB',
    })
    // clearing process env
    process.env.DATABASE_HOST = undefined
    process.env.DATABASE_PORT = undefined
    process.env.DATABASE_USERNAME = undefined
    process.env.DATABASE_PASSWORD = undefined
    process.env.DATABASE_NAME = undefined
  })
})
