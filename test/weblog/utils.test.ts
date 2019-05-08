import { Utils } from '../../src/weblog/utils'
test('uuid', () => {
  const result = Utils.buildUUID()
  expect(result).not.toBeNull()
})
