import { Weblog, IHttpPost } from '../../src/weblog'
const poster = {
  send(content: any): Promise<boolean> {
    return new Promise(resolve => {
      resolve(true)
    })
  }
}
const win: Window = {} as Window

test('init valid', async done => {
  const logger = new Weblog(win, poster)
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

describe('update params', () => {
  test('appendDefaultParam', () => {
    const logger = new Weblog(win, poster)
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
