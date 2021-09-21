delete process.env.CI
process.env.FORCE_COLOR = '1'
process.env.NO_COLOR = '1'

let { red, createColors, isColorSupported } = require('../index')

it('disabled colors on request', () => {
  expect(isColorSupported).toBe(false)
  expect(red('text')).toEqual(createColors(false).red('text'))
})
