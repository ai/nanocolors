#!/usr/bin/env node

let benchmark = require('benchmark')
let colorette = require('colorette')
let kleur = require('kleur')
let kleurColors = require('kleur/colors')
let chalk = require('chalk')
let ansi = require('ansi-colors')

let nanocolors = require('../')

function formatNumber(number) {
  return String(number)
    .replace(/\d{3}$/, ',$&')
    .replace(/^(\d|\d\d)(\d{3},)/, '$1,$2')
}

let suite = new benchmark.Suite()

suite
  .add('chalk', () => {
    chalk.red(chalk.bold('bold') + ' red')
  })
  .add('ansi-colors', () => {
    ansi.red(ansi.bold('bold') + ' red')
  })
  .add('kleur', () => {
    kleur.red(kleur.bold('bold') + ' red')
  })
  .add('kleur/colors', () => {
    kleurColors.red(kleurColors.bold('bold') + ' red')
  })
  .add('colorette', () => {
    colorette.red(colorette.bold('bold') + ' red')
  })
  .add('nanocolors', () => {
    nanocolors.red(nanocolors.bold('bold') + ' red')
  })
  .on('cycle', event => {
    let name = event.target.name.padEnd('kleur/colors  '.length)
    let hz = formatNumber(event.target.hz.toFixed(0)).padStart(10)
    process.stdout.write(`${name}${nanocolors.bold(hz)} ops/sec\n`)
  })
  .run()
