#!/usr/bin/env node

import benchmark from 'benchmark'
import * as colorette from 'colorette'
import kleur from 'kleur'
import * as kleurColors from 'kleur/colors'
import chalk from 'chalk'
import ansi from 'ansi-colors'
import cliColor from 'cli-color'

import * as nanocolors from '../index.js'

function formatNumber(number) {
  return String(number)
    .replace(/\d{3}$/, ',$&')
    .replace(/^(\d|\d\d)(\d{3},)/, '$1,$2')
}

let suite = new benchmark.Suite()

suite
  .add('chalk', () => {
    chalk.red(chalk.green('green') + ' red ' + chalk.bold(100000))
  })
  .add('cli-color', () => {
    cliColor.red(cliColor.green('green') + ' red ' + cliColor.bold(100000))
  })
  .add('ansi-colors', () => {
    ansi.red(ansi.green('green') + ' red ' + ansi.bold(100000))
  })
  .add('kleur', () => {
    kleur.red(kleur.green('green') + ' red ' + kleur.bold(100000))
  })
  .add('kleur/colors', () => {
    kleurColors.red(
      kleurColors.green('green') + ' red ' + kleurColors.bold(100000)
    )
  })
  .add('colorette', () => {
    colorette.red(colorette.green('green') + ' red ' + colorette.bold(100000))
  })
  .add('nanocolors', () => {
    nanocolors.red(
      nanocolors.green('green') + ' red ' + nanocolors.bold(100000)
    )
  })
  .on('cycle', event => {
    let name = event.target.name.padEnd('kleur/colors  '.length)
    let hz = formatNumber(event.target.hz.toFixed(0)).padStart(10)
    process.stdout.write(`${name}${nanocolors.bold(hz)} ops/sec\n`)
  })
  .run()
