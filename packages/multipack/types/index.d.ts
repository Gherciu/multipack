import { TToNumber } from '@episclera/multipack-utils'

export interface Multipack {
  toNumber: TToNumber
}

// package exports
export const toNumber: TToNumber

declare const multipack: Multipack

export default multipack
