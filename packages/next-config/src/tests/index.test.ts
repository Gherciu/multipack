import { mergeConfigs } from '@episclera/multipack-utils'
import { i18n } from '@episclera/next-i18next-config'
import path from 'path'
import nextConfig from '../index'

jest.mock('next-plugin-antd-less', (...rest) => rest)
describe('nextConfig', () => {
  it('Should correctly merge provided next config with its own', () => {
    expect(
      nextConfig([], {
        i18n: {
          defaultLocale: 'ar',
          locales: [...i18n.locales, 'ar'],
        },
        publicRuntimeConfig: {
          HOME_ROUTE_PATH: '/',
        },
      })('development', {}),
    ).toMatchObject({
      i18n: {
        defaultLocale: 'ar',
        locales: ['en', 'ar'],
      },
      publicRuntimeConfig: {
        HOME_ROUTE_PATH: '/',
      },
    })
  })

  it('Should correctly merge provided webpack config with its own', () => {
    expect(
      nextConfig([], {
        webpack: config =>
          mergeConfigs(config, {
            resolve: {
              alias: {
                myAlias: './myPath',
              },
            },
          }),
      })('development', {}).webpack?.({
        resolve: {
          alias: {
            nextAlias: './nextPath',
          },
        },
      }),
    ).toMatchObject({
      resolve: {
        alias: {
          '@components': path.join(process.cwd(), 'components'),
          nextAlias: './nextPath',
          myAlias: './myPath',
        },
      },
    })
  })

  it('Should correctly return its own webpack config', () => {
    expect(nextConfig([], {})('development', {}).webpack?.({})).toMatchObject({
      resolve: {
        alias: {
          '@components': path.join(process.cwd(), 'components'),
        },
      },
    })
  })

  it('Should correctly return its own webpack config', () => {
    expect(nextConfig([], {})('development', {}).webpack?.({})).toMatchObject({
      resolve: {
        alias: {
          '@components': path.join(process.cwd(), 'components'),
        },
      },
    })
  })

  it('Should work without errors when no params provided', () => {
    expect(() => nextConfig()).not.toThrow()
    expect(() => nextConfig([])).not.toThrow()
    expect(() => nextConfig([], {})).not.toThrow()
    expect(() => nextConfig([])('development', {})).not.toThrow()
    expect(() => nextConfig([], {})('development', {})).not.toThrow()
  })
})
