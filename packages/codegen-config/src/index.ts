import path from 'path'
import { readFileSync, existsSync } from 'fs'
import { parse } from 'dotenv'
import { CodeGenConfig } from '../types'

const envFilePath = path.join(process.cwd(), `./.env.${process.env.NODE_ENV}`)
/**
 * Using parse from dotenv instead of config because we don't want to override something from process.env
 */
const parsedEnvs = parse(
  existsSync(envFilePath) ? readFileSync(envFilePath) : '',
)

const codeGenConfig: CodeGenConfig = {
  /**
   * Resolving schema URI depending on available envs properties for Next and Strapi projects
   */
  schema:
    parsedEnvs.NEXT_PUBLIC_API_URI ||
    `${parsedEnvs.HOST || '0.0.0.0'}:${parsedEnvs.PORT || 3001}/graphql`,
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
