import './windows.js'
import { red, createColors, isColorSupported } from '../../index.js'

it('enables colors on Windows even without term', () => {
  expect(isColorSupported).toBe(true)
  expect(red('text')).toEqual(createColors(true).red('text'))
})
