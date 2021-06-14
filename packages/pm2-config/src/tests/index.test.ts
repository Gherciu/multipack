import path from 'path'
import { writeJSON, remove } from 'fs-extra'

describe('pm2Config', () => {
  it('Should load package.json file and read from there necessary properties to build in the end correct "script name"', async () => {
    const pkgFilePath = path.join(__dirname, './package.json')
    const spyCwd = jest.spyOn(process, 'cwd')
    spyCwd.mockReturnValue(__dirname)

    await writeJSON(pkgFilePath, {
      name: 'example-web',
    })

    // Importing it dynamically because package.json file also is created dynamically in this test and it can't read it initially
    const pm2Config = await import('../index')

    expect(pm2Config.default.apps[0].name).toBe('example-web')

    await remove(pkgFilePath)
  })

  it('Should load package.json file and read from there necessary properties to build in the end correct "script" for Next packages', async () => {
    const pkgFilePath = path.join(__dirname, './package.json')
    const spyCwd = jest.spyOn(process, 'cwd')
    spyCwd.mockReturnValue(__dirname)

    await writeJSON(pkgFilePath, {
      name: 'example-web',
      dependencies: {
        next: 'latest',
      },
    })

    // Importing it dynamically because package.json file also is created dynamically in this test and it can't read it initially
    const pm2Config = await import('../index')

    expect(pm2Config.default.apps[0].script).toBe('next start -p $PORT')

    await remove(pkgFilePath)
  })

  it('Should load package.json file and read from there necessary properties to build in the end correct "script" for Strapi packages', async () => {
    const pkgFilePath = path.join(__dirname, './package.json')
    const spyCwd = jest.spyOn(process, 'cwd')
    spyCwd.mockReturnValue(__dirname)

    await writeJSON(pkgFilePath, {
      name: 'example-api',
      dependencies: {
        strapi: 'latest',
      },
    })

    // Importing it dynamically because package.json file also is created dynamically in this test and it can't read it initially
    const pm2Config = await import('../index')

    expect(pm2Config.default.apps[0].script).toBe('strapi start')

    await remove(pkgFilePath)
  })

  it('Should build in the end a placeholder "script" if no Strapi or Next package found', async () => {
    const pkgFilePath = path.join(__dirname, './package.json')
    const spyCwd = jest.spyOn(process, 'cwd')
    spyCwd.mockReturnValue(__dirname)

    await writeJSON(pkgFilePath, {
      name: 'my-package',
    })

    // Importing it dynamically because package.json file also is created dynamically in this test and it can't read it initially
    const pm2Config = await import('../index')

    expect(pm2Config.default.apps[0].script).toMatch(
      'cowsay "No Next or Strapi package found. You should run PM2 only in root folders of Strapi or Next projects"',
    )

    await remove(pkgFilePath)
  })
})
