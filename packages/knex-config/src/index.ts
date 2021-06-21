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
  /**
   * In development and production mode are used pg connection
   * In test mode are used sqlite 3 to be possible to create and delete db on each test run
   */
  client:
    (get(process, 'env.NODE_ENV') as string) !== 'test' ? 'pg' : 'sqlite3',
  connection:
    (get(process, 'env.NODE_ENV') as string) !== 'test'
      ? {
          host: get(
            process,
            'env.DATABASE_HOST',
            parsedEnvs.DATABASE_HOST,
          ) as string,
          port: get(
            process,
            'env.DATABASE_PORT',
            parsedEnvs.DATABASE_PORT,
          ) as string,
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
        }
      : {
          /**
           * If is needed a custom DB name then DATABASE_FILENAME env var should be used
           * otherwise it will generate each time a new DB name
           * that's needed because sqlite connection is used only in tests and there exists a
           * possibility that one test can DROP the DB and another will fail due to this fact
           */
          filename: path.join(
            process.cwd(),
            parsedEnvs.DATABASE_FILENAME || `./tmp/${+new Date()}_test_db.sql`,
          ),
        },
  migrations: {
    directory: path.join(process.cwd(), './db/migrations'),
  },
  seeds: {
    directory: path.join(process.cwd(), './db/seeds'),
  },
}

export default knexConfig
