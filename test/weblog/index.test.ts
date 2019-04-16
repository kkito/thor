import { Weblog, IHttpPost } from '../../src/weblog'
export const poster = {
  send(content: any): Promise<boolean> {
    return new Promise(resolve => {
      resolve(true)
    })
  }
}
export const win: Window = { navigator: { userAgent: '' } , location: {href: ''} } as Window
export const logger = new Weblog(win, poster, 'test')

test('init valid', async done => {
  const result = await logger.send({ ok: true })
  expect(result).toBeTruthy()
  done()
})

test('mergeParam', () => {
  const result = Weblog.mergeParam({ a: 1, b: 2 }, { b: 3, c: 3 })
  expect(result['b']).toBe(3)
  expect(result['c']).toBe(3)
  expect(result['a']).toBe(1)
})

test('event', () => {
    const logger = new Weblog(win, poster, 'test')
    logger.event('test')
    logger.event('test', {'dex': 2})
})

test('logError', () => {
    const logger = new Weblog(win, poster, 'test')
    logger.logError(new Error('test'))
    logger.logError(new Error('test'), {'test':'33'})
})

describe('update params', () => {
  test('appendDefaultParam', () => {
    const logger = new Weblog(win, poster, 'test')
    logger.appendDefaultParam('a', 1)
    logger.appendDefaultParams({ b: 1 })
    let result = logger._getDefaultParam()
    expect(result['a']).toBe(1)
    expect(result['b']).toBe(1)

    logger.removeDefaultParam('b')
    result = logger._getDefaultParam()
    expect(result['a']).toBe(1)
    expect(result['b']).toBeUndefined()
  })
})
