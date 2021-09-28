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

suite
  .add('chalk', () => {
    out = chalk.red(chalk.bold('bold') + ' red')
  })
  .add('cli-color', () => {
    out = cliColor.red(cliColor.bold('bold') + ' red')
  })
  .add('ansi-colors', () => {
    out = ansi.red(ansi.bold('bold') + ' red')
  })
  .add('kleur', () => {
    out = kleur.red(kleur.bold('bold') + ' red')
  })
  .add('kleur/colors', () => {
    out = kleurColors.red(kleurColors.bold('bold') + ' red')
  })
  .add('colorette', () => {
    out = colorette.red(colorette.bold('bold') + ' red')
  })
  .add('felt-pen', () => {
    out = pen.red(pen.bold('bold') + ' red')
  })
  .add('nanocolors', () => {
    out = nanocolors.red(nanocolors.bold('bold') + ' red')
  })
  .add('picocolors', () => {
    out = picocolors.red(picocolors.bold('bold') + ' red')
  })
  .on('cycle', event => {
    let name = event.target.name.padEnd('kleur/colors  '.length)
    let hz = formatNumber(event.target.hz.toFixed(0)).padStart(10)
    process.stdout.write(`${name}${nanocolors.bold(hz)} ops/sec\n`)
  })
  .on('error', event => {
    process.stderr.write(nanocolors.red(event.target.error.toString()) + '\n')
  })
  .run()
