import './no-color.js'
import { red, createColors, isColorSupported } from '../../index.js'

it('disabled colors on request', () => {
  expect(isColorSupported).toBe(false)
  expect(red('text')).toEqual(createColors(false).red('text'))
})
