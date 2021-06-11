export interface KnexConfig {
  client: 'pg'
  connection: {
    user: string
    host: string
    password: string
    port: string
    database: string
  }
  migrations?: {
    directory?: string
  }
  seeds?: {
    directory?: string
  }
}

// package exports
declare const knexConfig: KnexConfig

export default knexConfig
