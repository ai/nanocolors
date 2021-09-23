#!/usr/bin/env node

import { mkdirSync, rmSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'
import { join } from 'path'

import { bold } from '../index.js'

function getSize(lib) {
  let testDir = join(fileURLToPath(import.meta.url), '..', 'size-test')
  mkdirSync(testDir)
  writeFileSync(join(testDir, 'package.json'), '{"private":true}')
  execSync(`yarn add ${lib}`, { cwd: testDir })
  let out = execSync(`du -sh node_modules/`, { cwd: testDir }).toString()
  rmSync(testDir, { recursive: true, force: true })
  if (out.includes('M')) {
    return String(parseFloat(out.match(/^(\d+(,\d+)?)M/)[1]) * 1024)
  } else {
    return out.match(/^(\d+)K/)[1]
  }
}

function benchmark(lib) {
  process.stdout.write(
    lib.padEnd('ansi-colors  '.length) +
      bold(getSize(lib).padStart(4)) +
      ' KB\n'
  )
}

benchmark('chalk')
benchmark('cli-color')
benchmark('ansi-colors')
benchmark('kleur')
benchmark('colorette')
benchmark('nanocolors')
