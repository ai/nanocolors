import * as main from '../index.js'

it('prints colors', () => {
  let colors = main.createColors(true)
  expect(colors.isColorSupported).toBe(true)
  let output = Object.entries(colors)
    .filter(([name]) => name !== 'isColorSupported' && name !== 'reset')
    .reduce(
      (all, [name, fn]) => `${all}\n${name.padEnd(13)} ${fn(name)}`,
      `\x1b[1mreset         ${colors.reset('reset')}`
    )
  expect(output).toMatchSnapshot()
})

it('supports nested colors', () => {
  let { green, red } = main.createColors(true)
  expect(green('a ' + red('b') + ' c')).toMatchSnapshot()
})

it('disables colors', () => {
  let noColors = main.createColors(false)
  expect(noColors.isColorSupported).toBe(false)
  let keys = Object.keys(noColors) as (keyof main.Colors)[]
  keys.forEach(name => {
    if (name !== 'isColorSupported') {
      expect(noColors[name]('text')).toEqual('text')
    }
  })
})

it('copies all methods', () => {
  let created = Object.keys(main.createColors(true))
  expect(Object.keys(main)).toEqual(created.concat(['createColors']))
})

it('does not add modifiers to empty string', () => {
  let { green } = main.createColors(true)
  expect(green('')).toEqual('')
})
