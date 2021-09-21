process.env.TERM = 'dumb'

let { red, createColors, isColorSupported } = require('../index')

it('disabled colors without term', () => {
  expect(isColorSupported).toBe(false)
  expect(red('text')).toEqual(createColors(false).red('text'))
})
