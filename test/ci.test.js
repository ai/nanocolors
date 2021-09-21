process.env.TERM = 'dumb'
process.env.CI = '1'
process.env.GITHUB_ACTIONS = '1'

let { red, createColors, isColorSupported } = require('../index')

it('enables colors on CI even without term', () => {
  expect(isColorSupported).toBe(true)
  expect(red('text')).toEqual(createColors(true).red('text'))
})
