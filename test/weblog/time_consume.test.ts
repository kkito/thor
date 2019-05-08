import { TimeConsume } from '../../src/weblog/time_consume'
import { logger } from './index.test'
test('init valid', () => {
  let tc = new TimeConsume(logger, {})
  // tslint:disable-next-line:no-empty
  logger.debounceSend = () => {
  }
  expect(tc).not.toBeNull()
  logger.clearDebounce()
  tc.finish()

  tc = new TimeConsume(logger)
  expect(tc).not.toBeNull()
  logger.clearDebounce()
  tc.finish()

  tc = new TimeConsume(logger, { a: 1 })
  expect(tc).not.toBeNull()
  logger.clearDebounce()
  tc.finish()
})

test('finish', () => {
  const tc = new TimeConsume(logger, {})
  expect(tc).not.toBeNull()

  let result = tc.finish()
  expect(result['G_status']).toEqual(200)
  result = tc.finish(401)
  expect(result['G_status']).toEqual(401)
})
