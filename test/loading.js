#!/usr/bin/env node

let before
function showTime(name) {
  let after = performance.now()
  let time = (Math.round(1000 * (after - before)) / 1000).toString()
  let title = name.padEnd('ansi-colors  '.length)
  process.stdout.write(title + '\x1B[1m' + time.padEnd(5) + '\x1B[22m ms\n')
}

before = performance.now()
let chalk = require('chalk')
showTime('chalk')

before = performance.now()
let ansi = require('ansi-colors')
showTime('ansi-colors')

before = performance.now()
let kleur = require('kleur')
showTime('kleur')

before = performance.now()
let colorette = require('colorette')
showTime('colorette')

before = performance.now()
let nanocolors = require('../index')
showTime('nanocolors')
