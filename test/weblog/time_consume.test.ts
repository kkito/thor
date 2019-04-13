import { TimeConsume } from '../../src/weblog/time_consume'
import { logger } from './index.test'
test('init valid', () => {
  let tc = new TimeConsume(logger, {})
  expect(tc).not.toBeNull()

  tc = new TimeConsume(logger)
  expect(tc).not.toBeNull()

  tc = new TimeConsume(logger, { a: 1 })
  expect(tc).not.toBeNull()
})

test('finish', () => {
  const tc = new TimeConsume(logger, {})
  expect(tc).not.toBeNull()

  let result = tc.finish()
  expect(result['_status']).toEqual(200)
  result = tc.finish(401)
  expect(result['_status']).toEqual(401)
})
