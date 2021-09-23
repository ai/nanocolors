#!/usr/bin/env node

import { mkdirSync, rmSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'
import { join } from 'path'

import { bold, gray } from '../index.js'

function getSize(lib) {
  let testDir = join(fileURLToPath(import.meta.url), '..', 'size-test')
  mkdirSync(testDir)
  writeFileSync(join(testDir, 'package.json'), '{"private":true}')
  let install = execSync(`yarn add ${lib}@latest`, { cwd: testDir }).toString()
  let version = install.match(new RegExp(lib + '@(\\d+\\.\\d+\\.\\d+)'))[1]
  let out = execSync(`du -sh node_modules/`, { cwd: testDir }).toString()
  rmSync(testDir, { recursive: true, force: true })
  let size
  if (out.includes('M')) {
    size = String(parseFloat(out.match(/^(\d+(,\d+)?)M/)[1]) * 1024)
  } else {
    size = out.match(/^(\d+)K/)[1]
  }
  return [size, version]
}

function benchmark(lib) {
  let [size, version] = getSize(lib)
  process.stdout.write(
    lib.padEnd('ansi-colors  '.length) +
      bold(size.padStart(4)) +
      ' KB ' +
      gray(version) +
      '\n'
  )
}

benchmark('chalk')
benchmark('cli-color')
benchmark('ansi-colors')
benchmark('kleur')
benchmark('colorette')
benchmark('nanocolors')
