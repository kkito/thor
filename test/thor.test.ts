import { DummyClass } from "../src/thor"

/**
 * Dummy test
 */
describe("Dummy test", () => {
  it("works if true is truthy", () => {
    expect(true).toBeTruthy()
  })

  it("DummyClass is instantiable", () => {
    expect(new DummyClass()).toBeInstanceOf(DummyClass)
  })

  it('test add', () => {
    expect(DummyClass.add(1,2)).toBe(3)
  })
})
