import { TimeConsume } from '../../src/weblog/time_consume'
import { logger } from './index.test'
test('init valid', () => {
  const tc = new TimeConsume(logger, {})
  expect(tc).not.toBeNull()
})
