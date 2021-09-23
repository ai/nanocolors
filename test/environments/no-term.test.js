import './no-term.js'
import { red, createColors, isColorSupported } from '../../index.js'

it('disabled colors without term', () => {
  expect(isColorSupported).toBe(false)
  expect(red('text')).toEqual(createColors(false).red('text'))
})
