process.env.TERM = 'dumb'
process.env.FORCE_COLOR = '1'

let { red, createColors, isColorSupported } = require('../index')

it('enables colors on request even without term', () => {
  expect(isColorSupported).toBe(true)
  expect(red('text')).toEqual(createColors(true).red('text'))
})
