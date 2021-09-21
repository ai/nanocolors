import { isColorSupported } from '../index.js'

it('has no color support', () => {
  expect(isColorSupported).toBe(false)
})
