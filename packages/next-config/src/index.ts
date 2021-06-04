/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import withPlugins from 'next-compose-plugins'
import withAntdLess from 'next-plugin-antd-less'
import { i18n } from '@episclera/next-i18next-config'
import { mergeConfigs } from '@episclera/multipack-utils'
import { NextConfig } from '../types'

const nextConfig: NextConfig = (plugins = [], config = {}) => {
  const { webpack: webpackToMerge, ...configToMerge } = config

  return (withPlugins as NextConfig)(
    [[withAntdLess], ...plugins],
    mergeConfigs(
      {
        i18n,
        webpack: (nextWebpackConfig: { [key: string]: any }) => {
          const customWebpackConfig = mergeConfigs(nextWebpackConfig, {
            module: {
              rules: [
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                ...(nextWebpackConfig?.module?.rules || []),
                {
                  test: /.(jpeg|png|webp|gif|ico|mp4|mp3)$/,
                  loader: 'file-loader',
                  options: {
                    name: '[name]-[hash].[ext]',
                    publicPath: '/_next/static',
                    outputPath: 'static',
                  },
                },
                {
                  test: /.svg$/,
                  use: [
                    {
                      loader: '@svgr/webpack',
                      options: {
                        svgoConfig: {
                          pretty: true,
                          multipass: true,
                          plugins: [
                            { removeViewBox: false },
                            { removeAttrs: { attrs: '(width|height)' } },
                          ],
                        },
                      },
                    },
                    {
                      loader: 'url-loader',
                      options: {
                        limit: 8192,
                        name: '[name]-[hash].[ext]',
                        publicPath: '/_next/static',
                        outputPath: 'static',
                      },
                    },
                  ],
                },
              ],
            },
          })

          if (webpackToMerge) {
            return webpackToMerge(customWebpackConfig)
          }

          return customWebpackConfig
        },
      },
      configToMerge,
    ),
  )
}

export default nextConfig
