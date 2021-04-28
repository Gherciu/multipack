/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return */
import mergeWith from 'lodash.mergewith'
import isArray from 'lodash.isarray'
import isObject from 'lodash.isobject'
import { TMergeConfigs } from '../types'

const mergeConfigs: TMergeConfigs = (initialConfig, ...otherConfigs) => {
  const customizer = (prevValue: any, nextValue: any) => {
    if (
      !isArray(prevValue) &&
      !isArray(nextValue) &&
      isObject(prevValue) &&
      isObject(nextValue)
    ) {
      return mergeConfigs(prevValue, nextValue, customizer)
    }

    return nextValue
  }

  return mergeWith(initialConfig, ...otherConfigs, customizer)
}

export default mergeConfigs
