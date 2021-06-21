export interface KnexConfig {
  client: 'pg' | 'sqlite3'
  connection:
    | {
        user: string
        host: string
        password: string
        port: string
        database: string
      }
    | {
        filename: string
      }
  migrations: {
    directory: string
  }
  seeds: {
    directory: string
  }
}

// package exports
declare const knexConfig: KnexConfig

export default knexConfig
