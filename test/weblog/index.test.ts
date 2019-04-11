import { Weblog, IHttpPost } from '../../src/weblog'

test('init valid', async done => {
  const poster = {
    post(content: any): Promise<boolean> {
      return new Promise(resolve => {
        resolve(true)
      })
    }
  }
  const logger = new Weblog(poster)
  const result = await logger.send({ ok: true })
  expect(result).toBeTruthy()
  done()
})
