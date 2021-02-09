/*
 * 需求
 * {
      url: /base/get,
      params: {
        a: 1,
        b: 2
      }
 * }
 * /base/get?a=1&b=2
 *
 *
 * 
 * {
      url: /base/get?foo=bar,
      params: {
        bar: 'baz'
      }
 * }
 * /base/get?foo=bar&bar=baz
 *    
 *
 *
 * {
 *    url: /base/get,
 *    params: {
 *      foo: ['bar', 'baz']
 *    }
 * }   
 * /base/get?foo[]=bar&foo[]=baz   
 *
 *
 * 
 * {
 *    url: /base/get,
 *    params: {
        foo: {
            bar: 'baz'
        } 
 *    }
 * }
 * /base/get?foo=%7B%22bar%22:%22baz%22%7D
 * 
 *
 *
 * {
 *    url: /base/get,
 *    params: {
 *      date
 *    }
 * }
 * /base/get?date=2018-04-01T05:55:39:030Z
 *
 *
 * 对与字符@:$, []允许出现在url中，不希望被encode，注意我们会把空格换成+
 *
 * 丢弃url中的哈希标记
 * */
import { isDate, isPlainObject } from './util'

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildURL(url: string, params?: any): string {
  if (!params) {
    return url
  }

  const parts: string[] = []

  Object.keys(params).forEach(key => {
    const val = params[key]
    if (val === null || val === undefined) {
      return
    }
    let values = []
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }

    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  let serializedParams = parts.join('&')
  if (serializedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }
  return url
}
