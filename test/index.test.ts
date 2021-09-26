import * as main from '../index'

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
  let { green, red, bold, dim } = main.createColors(true)
  expect(green('a ' + red('b') + ' c')).toMatchSnapshot()
  expect(bold('b ' + red('r ' + dim('d') + ' r') + ' b')).toMatchSnapshot()
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
  expect(Object.keys(main).sort()).toEqual(
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
  // @ts-expect-error
  expect(red(new Date(0))).toEqual(red(String(new Date(0))))
  // @ts-expect-error
  expect(red()).toEqual(red('undefined'))
  // @ts-expect-error
  expect(red(undefined)).toEqual(red('undefined'))
  // @ts-expect-error
  expect(red(null)).toEqual(red('null'))
})

it('converts non-string to string on disabled colors', () => {
  let { red } = main.createColors(false)
  expect(typeof red(1)).toEqual('string')
  expect(red(1)).toEqual('1')
  // @ts-expect-error
  expect(red()).toEqual('undefined')
  // @ts-expect-error
  expect(red()).toEqual('undefined')
  // @ts-expect-error
  expect(red(null)).toEqual('null')
})
