import path from 'path'
import { readFileSync, existsSync } from 'fs'
import get from 'lodash.get'
import { parse } from 'dotenv'
import { KnexConfig } from '../types'

/**
 * Using lodash.get because webpack for some reason replace process.env properties with values at build time even if wp mode is node
 */
const envFilePath = path.join(
  process.cwd(),
  `./.env.${get(process, 'env.NODE_ENV')}`,
)
/**
 * Using parse from dotenv instead of config because we don't want to override something from process.env
 */
const parsedEnvs = parse(
  existsSync(envFilePath) ? readFileSync(envFilePath) : '',
)

const knexConfig: KnexConfig = {
  client: 'pg',
  connection: {
    host: get(process, 'env.DATABASE_HOST', parsedEnvs.DATABASE_HOST) as string,
    port: get(process, 'env.DATABASE_PORT', parsedEnvs.DATABASE_PORT) as string,
    user: get(
      process,
      'env.DATABASE_USERNAME',
      parsedEnvs.DATABASE_USERNAME,
    ) as string,
    password: get(
      process,
      'env.DATABASE_PASSWORD',
      parsedEnvs.DATABASE_PASSWORD,
    ) as string,
    database: get(
      process,
      'env.DATABASE_NAME',
      parsedEnvs.DATABASE_NAME,
    ) as string,
  },
  migrations: {
    directory: path.join(process.cwd(), './db/migrations'),
  },
  seeds: {
    directory: path.join(process.cwd(), './db/seeds'),
  },
}

export default knexConfig
