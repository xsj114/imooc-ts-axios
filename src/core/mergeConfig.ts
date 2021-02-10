import { AxiosRequestConfig } from '../types'

function defaultStart(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}

export default function mergeConfig(
  config: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }

  const config = Object.create(null)

  for (let key in config2) {
  }

  function mergeField(key: string): void {
    const start
    config[key] = start(config1[key], config2[key])
  }
}
