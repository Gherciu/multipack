import path from 'path'
import { readJSONSync } from 'fs-extra'
import { PM2Config } from '../types'

const pkg = readJSONSync(path.join(process.cwd(), './package.json')) as {
  name: string
  dependencies?: {
    strapi?: string
    next?: string
  }
}

const isNextPackage = pkg.dependencies?.next
const isStrapiPackage = pkg.dependencies?.strapi

const pm2Config: PM2Config = {
  apps: [
    {
      /**
       * Using package name as a process name
       */
      name: pkg.name,
      script:
        (isNextPackage && 'next start -p $PORT') ||
        (isStrapiPackage && 'strapi start') ||
        'npx cowsay "No Next or Strapi package found. You should run PM2 only in root folders of Strapi or Next projects"',
      /**
       * This value was chosen because t2.micro has 1GB memory limit https://aws.amazon.com/ec2/instance-types/t2/
       * but using the entire memory is not possible and correct because other processes also requires some memory
       * Also Node has it's built in memory limit of 1.4GB so there is no sense to use other
       * machines with more resources than t2.micro because these resources will be not used
       */
      max_memory_restart: '700M', // 70% of t2.micro memory and 50% of Node memory limit
      /**
       * Exponential backoff restart will increase incrementally the time between restarts
       * reducing the pressure on your DB or your external provider
       * if initial value is e.g. 100ms then the next restart will be after ~150ms then ~225ms etc.
       * maximum interval is 15000ms
       * See more here https://pm2.keymetrics.io/docs/usage/restart-strategies/#exponential-backoff-restart-delay
       */
      exp_backoff_restart_delay: 100,
      /**
       * There is no sense to add exec_modo='cluster' because
       * T2.micro instances have only one vCPU
       * and is more cheap and error prone to use multiple t2.micro with scaling
       * and load balancer that one heavy machine with many resources
       */
    },
  ],
}

export default pm2Config
