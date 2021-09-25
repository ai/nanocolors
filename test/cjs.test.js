import main from '../index.cjs'
import * as esm from '../index.js'

it('prints colors', () => {
  let colors = main.createColors(true)
  let colorsEsm = esm.createColors(true)
  expect(colors.isColorSupported).toBe(true)
  let outputCjs = Object.entries(colors)
    .filter(([name]) => name !== 'isColorSupported' && name !== 'reset')
    .reduce(
      (all, [name, fn]) => `${all}\n${name.padEnd(13)} ${fn(name)}`,
      `\x1b[1mreset         ${colors.reset('reset')}`
    )
  let outputEsm = Object.entries(colorsEsm)
    .filter(([name]) => name !== 'isColorSupported' && name !== 'reset')
    .reduce(
      (all, [name, fn]) => `${all}\n${name.padEnd(13)} ${fn(name)}`,
      `\x1b[1mreset         ${colorsEsm.reset('reset')}`
    )
  expect(outputCjs).toEqual(outputEsm)
})

it('supports nested colors', () => {
  let { green, red } = main.createColors(true)
  let c = esm.createColors(true)
  expect(green('a ' + red('b') + ' c')).toEqual(
    c.green('a ' + c.red('b') + ' c')
  )
})

it('disables colors', () => {
  let noColors = main.createColors(false)
  expect(noColors.isColorSupported).toBe(false)
  let keys = Object.keys(noColors)
  keys.forEach(name => {
    if (name !== 'isColorSupported') {
      expect(noColors[name]('text')).toEqual('text')
    }
  })
})

it('copies all methods', () => {
  let created = Object.keys(main.createColors(true))
  expect(Object.keys(main).sort()).toEqual(
    created.concat(['createColors']).sort()
  )
})

it('does not add modifiers to empty string', () => {
  let { green } = main.createColors(true)
  expect(green('')).toEqual('')
})

it('converts number to string on disabled colors', () => {
  let noColors = main.createColors(false)
  expect(typeof noColors.red(1)).toEqual('string')
})
