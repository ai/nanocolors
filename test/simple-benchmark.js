#!/usr/bin/env node

import benchmark from 'benchmark'
import * as colorette from 'colorette'
import kleur from 'kleur'
import * as kleurColors from 'kleur/colors'
import chalk from 'chalk'
import ansi from 'ansi-colors'
import cliColor from 'cli-color'
import * as pen from 'felt-pen'

import * as nanocolors from '../index.js'

function formatNumber(number) {
  return String(number)
    .replace(/\d{3}$/, ',$&')
    .replace(/^(\d|\d\d)(\d{3},)/, '$1,$2')
}

let suite = new benchmark.Suite()

let out // eslint-disable-line no-unused-vars
let index = 1e8

suite
  .add('chalk', () => {
    out = chalk.red(chalk.bold('bold' + ++index) + ' red')
  })
  .add('cli-color', () => {
    out = cliColor.red(cliColor.bold('bold' + ++index) + ' red')
  })
  .add('ansi-colors', () => {
    out = ansi.red(ansi.bold('bold' + ++index) + ' red')
  })
  .add('kleur', () => {
    out = kleur.red(kleur.bold('bold' + ++index) + ' red')
  })
  .add('kleur/colors', () => {
    out = kleurColors.red(kleurColors.bold('bold' + ++index) + ' red')
  })
  .add('colorette', () => {
    out = colorette.red(colorette.bold('bold' + ++index) + ' red')
  })
  .add('felt-pen', () => {
    out = pen.red(pen.bold('bold' + ++index) + ' red')
  })
  .add('nanocolors', () => {
    out = nanocolors.red(nanocolors.bold('bold' + ++index) + ' red')
  })
  .on('cycle', event => {
    let name = event.target.name.padEnd('kleur/colors  '.length)
    let hz = formatNumber(event.target.hz.toFixed(0)).padStart(10)
    process.stdout.write(`${name}${nanocolors.bold(hz)} ops/sec\n`)
    index = 1e8
  })
  .run()
