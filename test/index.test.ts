import * as main from '../index'
import * as colorette from 'colorette'
import kleur from 'kleur'
import * as kleurColors from 'kleur/colors'
import chalk from 'chalk'
import ansiColors from 'ansi-colors'
import cliColor from 'cli-color'

it('matches chalk', () => {
  expect(main.yellow('specific text')).toBe(chalk.yellow('specific text'));
})

it('matches cliColor', () => {
  expect(main.yellow('specific text')).toBe(cliColor.yellow('specific text'))
})

it('matches ansiColors', () => {
  expect(main.yellow('specific text')).toBe(ansiColors.yellow('specific text'))
})

it('matches kleur', () => {
  expect(main.yellow('specific text')).toBe(kleur.yellow('specific text'))
})

it('matches colorette', () => {
  expect(main.yellow('specific text')).toBe(colorette.yellow('specific text'))
})

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
