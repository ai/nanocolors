import * as main from '../index.cjs'
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
  let { green, red, bold, dim } = main.createColors(true)
  let c = esm.createColors(true)
  expect(green('a ' + red('b') + ' c')).toEqual(
    c.green('a ' + c.red('b') + ' c')
  )
  expect(bold('b ' + red('r ' + dim('d') + ' r') + ' b')).toEqual(
    c.bold('b ' + c.red('r ' + c.dim('d') + ' r') + ' b')
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
    created.concat(['createColors', 'default']).sort()
  )
  expect(Object.keys(main.default).sort()).toEqual(
    created.concat(['createColors']).sort()
  )
})

it('does not add modifiers to empty string', () => {
  let { green } = main.createColors(true)
  expect(green('')).toEqual('')
})

it('converts non-string to string', () => {
  let { red } = main.createColors(true)
  expect(typeof red(1)).toEqual('string')
  expect(red(1)).toEqual(red('1'))
  expect(red(new Date(0))).toEqual(red(String(new Date(0))))
  expect(red()).toEqual(red('undefined'))
  expect(red(undefined)).toEqual(red('undefined'))
  expect(red(null)).toEqual(red('null'))
})

it('converts non-string to string on disabled colors', () => {
  let { red } = main.createColors(false)
  expect(typeof red(1)).toEqual('string')
  expect(red(1)).toEqual('1')
  expect(red()).toEqual('undefined')
  expect(red()).toEqual('undefined')
  expect(red(null)).toEqual('null')
})
