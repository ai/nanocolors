#!/usr/bin/env node

let assets = require('assert')

let { createColors } = require('../index.cjs')

let { red, isColorSupported } = createColors(true)

assets.ok(isColorSupported)
assets.equal(red('text'), '\x1B[31mtext\x1B[39m')
