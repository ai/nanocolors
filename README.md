# Nano Colors

A tiny and fast Node.js library for formatting terminal text with ANSI colors.

* **Fast.** It is 70% faster than `chalk`.
* **Lightweight.** It loads 2 times faster than `chalk`.
* **Actively maintained.** Used in many big projects
  like PostCSS or Browserslist.
* **No dependencies.** It takes 5 times less space in `node_modules`
  than `chalk`.
* **Auto-detects color support.** You can also toggle color mode manually.
* **Tree-shakable.** We use a dual ESM/CJS package.
* Support universal Node.js/browser projects.

```js
import { green, bold } from 'nanocolors'

console.log(
  green(`Task ${bold('1')} was finished`)
)
```

<p align="center">
  <img src="./example.png" alt="Nano Colors output" width="600">
</p>

<a href="https://evilmartians.com/?utm_source=nanocolors">
  <img src="https://evilmartians.com/badges/sponsored-by-evil-martians.svg"
       alt="Sponsored by Evil Martians" width="236" height="54">
</a>


## Benchmarks

Function calling time:

```
$ ./test/benchmark.js
chalk         11,680,127 ops/sec
ansi-colors    3,654,108 ops/sec
kleur         15,857,360 ops/sec
kleur/colors  22,195,173 ops/sec
colorette     20,630,562 ops/sec
nanocolors    20,681,984 ops/sec
```

Library loading time:

```
$ ./test/loading.js
chalk         3.436 ms
ansi-colors   1.083 ms
kleur         1.167 ms
kleur/colors  0.442 ms
colorette     2.061 ms
nanocolors    0.402 ms
```

The space in `node_modules` including sub-dependencies:

```
$ ./test/size.js
chalk         192 KB
ansi-colors    40 KB
kleur          44 KB
colorette      32 KB
nanocolors     36 KB
```

Test configuration: ThinkPad X1 Carbon Gen 9, Fedora 34, Node.js 16.8.

## Replacing `chalk`

1. Replace import and use named exports:

   ```diff
   - import chalk from 'chalk'
   + import { red, bold } from 'nanocolors'
   ```

2. Unprefix calls:

   ```diff
   - chalk.red(text)
   + red(text)
   ```

3. Replace chains to nested calls:

   ```diff
   - chalk.red.bold(text)
   + red(bold(text))
   ```


## API

### Individual Colors

Nano Colors exports functions:

| Colors    | Background Colors   | Modifiers         |
| --------- | ------------------- | ----------------- |
| `black`   | `bgBlack`           | dim               |
| `red`     | `bgRed`             | **bold**          |
| `green`   | `bgGreen`           | hidden            |
| `yellow`  | `bgYellow`          | _italic_          |
| `blue`    | `bgBlue`            | <u>underline</u>  |
| `magenta` | `bgMagenta`         | ~~strikethrough~~ |
| `cyan`    | `bgCyan`            | reset             |
| `white`   | `bgWhite`           |                   |
| `gray`    |                     |                   |

Functions are not chainable. You need to wrap it inside each other:

```js
import { black, bgYellow } from 'nanocolors'

console.log(bgYellow(black(' WARN ')))
```

Functions will use colors only if Nano Colors auto-detect that current
environment supports colors.

You can get support level in `isColorSupported`:

```js
import { isColorSupported } from 'nanocolors'

if (isColorSupported) {
  console.log('With colors')
}
```


### Conditional Support

You can manually switch colors on/off and override color support auto-detection:

```js
import { createColors } from 'nanocolors'

const { red } = createColors(options.enableColors)
```

On `undefined` argument, `createColors` will use value
from color support auto-detection.


## Thanks

API design was inspired
by [`colorette`](https://github.com/jorgebucaran/colorette)
and [`kleur`](https://github.com/lukeed/kleur).
