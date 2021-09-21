delete process.env.CI
process.env.TERM = 'dumb'
Object.defineProperty(process, 'platform', {
  value: 'win32'
})

let { red, createColors, isColorSupported } = require('../index')

it('enables colors on Windows even without term', () => {
  expect(isColorSupported).toBe(true)
  expect(red('text')).toEqual(createColors(true).red('text'))
})
