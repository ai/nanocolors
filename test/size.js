#!/usr/bin/env node

let { mkdirSync, rmSync, writeFileSync } = require('fs')
let { execSync } = require('child_process')
let { join } = require('path')

let { bold } = require('..')

function getSize(lib) {
  let testDir = join(__dirname, 'size-test')
  mkdirSync(testDir)
  writeFileSync(join(testDir, 'package.json'), '{"private":true}')
  execSync(`yarn add ${lib}`, { cwd: testDir })
  let out = execSync(`du -sh node_modules/`, { cwd: testDir }).toString()
  rmSync(testDir, { recursive: true, force: true })
  return out.match(/^(\d+)K/)[1]
}

function benchmark(lib) {
  process.stdout.write(
    lib.padEnd('ansi-colors  '.length) +
      bold(getSize(lib).padStart(4)) +
      ' KB\n'
  )
}

benchmark('chalk')
benchmark('ansi-colors')
benchmark('kleur')
benchmark('colorette')
benchmark('nanocolors')
