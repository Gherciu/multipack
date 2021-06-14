export interface PM2Config {
  apps: {
    name: string
    script: string
    max_memory_restart: string
    exp_backoff_restart_delay: number
  }[]
}

// package exports
declare const knexConfig: PM2Config

export default knexConfig
