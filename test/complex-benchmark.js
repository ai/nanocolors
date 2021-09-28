#!/usr/bin/env node

// Benchmark results are unstable. To have more stable results:
// 1. Restart OS. Do not run any applications. Put power cable to laptop.
// 2. Run tests 5 times.
// 3. Took the best result for each candidate.

import benchmark from 'benchmark'
import * as colorette from 'colorette'
import kleur from 'kleur'
import * as kleurColors from 'kleur/colors'
import chalk from 'chalk'
import ansi from 'ansi-colors'
import cliColor from 'cli-color'
import * as pen from 'felt-pen'
import * as picocolors from 'picocolors'

import * as nanocolors from '../index.js'

function formatNumber(number) {
  return String(number)
    .replace(/\d{3}$/, ',$&')
    .replace(/^(\d|\d\d)(\d{3},)/, '$1,$2')
}

let suite = new benchmark.Suite()
let out
let index = 1e8

suite
  .add('chalk', () => {
    out =
      chalk.bgYellow.black(' WARN ') +
      chalk.red(chalk.green(' green') + ' red ' + chalk.bold(++index))
  })
  .add('cli-color', () => {
    out =
      cliColor.bgYellow.black(' WARN ') +
      cliColor.red(cliColor.green(' green') + ' red ' + cliColor.bold(++index))
  })
  .add('ansi-colors', () => {
    out =
      ansi.bgYellow.black(' WARN ') +
      ansi.red(ansi.green(' green') + ' red ' + ansi.bold(++index))
  })
  .add('kleur', () => {
    out =
      kleur.bgYellow().bold(' WARN ') +
      kleur.red(kleur.green(' green') + ' red ' + kleur.bold(++index))
  })
  .add('kleur/colors', () => {
    out =
      kleurColors.bgYellow(kleurColors.black(' WARN ')) +
      kleurColors.red(
        kleurColors.green(' green') + ' red ' + kleurColors.bold(++index)
      )
  })
  .add('colorette', () => {
    out =
      colorette.bgYellow(colorette.black(' WARN ')) +
      colorette.red(
        colorette.green(' green') + ' red ' + colorette.bold(++index)
      )
  })
  .add('felt-pen', () => {
    out =
      pen.Yellow(' WARN ') +
      pen.red(pen.green(' green') + ' red ' + pen.bold(++index))
  })
  .add('nanocolors', () => {
    out =
      nanocolors.bgYellow(nanocolors.black(' WARN ')) +
      nanocolors.red(
        nanocolors.green(' green') + ' red ' + nanocolors.bold(++index)
      )
  })
  .add('picocolors', () => {
    out =
      picocolors.bgYellow(picocolors.black(' WARN ')) +
      picocolors.red(
        picocolors.green(' green') + ' red ' + picocolors.bold(`${++index}`)
      )
  })
  .on('cycle', event => {
    let name = event.target.name.padEnd('kleur/colors  '.length)
    let hz = formatNumber(event.target.hz.toFixed(0)).padStart(10)
    process.stdout.write(`${name}${nanocolors.bold(hz)} ops/sec\n`)
    index = 1e8
  })
  .on('error', event => {
    process.stderr.write(nanocolors.red(event.target.error.toString()) + '\n')
  })
  .run()
