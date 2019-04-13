import { Weblog, IHttpPost } from '../../src/weblog'

test('init valid', async done => {
  const poster = {
    send(content: any): Promise<boolean> {
      return new Promise(resolve => {
        resolve(true)
      })
    }
  }
  const win = {}
  const logger = new Weblog(win as Window, poster)
  const result = await logger.send({ ok: true })
  expect(result).toBeTruthy()
  done()
})

test('mergeParam' , () => {
  const result = Weblog.mergeParam({'a':1 ,'b':2} , {'b':3 , "c":3})
  expect(result['b']).toBe(3)
  expect(result['c']).toBe(3)
  expect(result['a']).toBe(1)
})
