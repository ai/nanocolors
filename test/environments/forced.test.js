import './forced.js'
import { red, createColors, isColorSupported } from '../../index.js'

it('enables colors on request even without term', () => {
  expect(isColorSupported).toBe(true)
  expect(red('text')).toEqual(createColors(true).red('text'))
})
