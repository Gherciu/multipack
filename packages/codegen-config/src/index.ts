import path from 'path'
import { readFileSync, existsSync } from 'fs'
import get from 'lodash.get'
import { parse } from 'dotenv'
import { CodeGenConfig } from '../types'

/**
 * Using lodash.get because webpack for some reason replace process.env properties with values at build time even if wp mode is node
 *
 * Default fallback to development env
 */
const processNodeEnv = get(process, 'env.NODE_ENV', 'development') as string
const envFilePath = path.join(process.cwd(), `./.env.${processNodeEnv}`)
/**
 * Using parse from dotenv instead of config because we don't want to override something from process.env
 */
const parsedEnvs = parse(
  existsSync(envFilePath) ? readFileSync(envFilePath) : '',
)

const codeGenConfig: CodeGenConfig = {
  /**
   * Resolving schema URL depending on available envs properties for Next and Strapi projects
   */
  schema: parsedEnvs.NEXT_PUBLIC_API_URL
    ? `${parsedEnvs.NEXT_PUBLIC_API_URL}/graphql`
    : `${parsedEnvs.API_URL}/graphql`,
  generates: {
    './api-types.d.ts': {
      plugins: [
        {
          add: {
            content: '/* ---- Auto generated file by GraphQL CodeGen ---- */',
          },
        },
        { add: { content: '/* eslint-disable */' } },
        'typescript',
      ],
    },
  },
}

export default codeGenConfig
