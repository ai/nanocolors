# Nano Colors

A tiny and fast Node.js library for formatting terminal text with ANSI colors.

* **Fast.** It is 70% faster than `chalk`.
* **Lightweight.** It loads 2 times faster than `chalk`.
* **Actively maintained.** Used in many big projects
  like PostCSS or Browserslist.
* **No dependencies.** It takes 5 times less space in `node_modules`
  than `chalk`.
* **Auto-detects color support.** You can also toggle color mode manually.
* **Tree-shakable.** We use dual ESM/CJS package.

```js
import { green, bold } from 'nanocolors'

console.log(
  green(`Task ${bold('1')} was finished`)
)
```

<p align="center">
  <img src="./example.png" alt="Nano Colors output" width="738">
</p>

<a href="https://evilmartians.com/?utm_source=nanocolors">
  <img src="https://evilmartians.com/badges/sponsored-by-evil-martians.svg"
       alt="Sponsored by Evil Martians" width="236" height="54">
</a>


## Benchmarks

```
$ ./test/benchmark.js
chalk         8,142,778 ops/sec
ansi-colors   2,626,780 ops/sec
kleur        11,299,102 ops/sec
colorette    14,852,996 ops/sec
nanocolors   14,897,991 ops/sec
```

```
$ ./test/loading.js
chalk        6.163 ms
ansi-colors  1.603 ms
kleur        1.771 ms
colorette    0.848 ms
nanocolors   0.571 ms
```

```
$ ./test/size.js
chalk         192 KB
ansi-colors    40 KB
kleur          44 KB
colorette      32 KB
```

Test configuration: ThinkPad X1 Carbon Gen 9, Fedora 34, Node.js 16.9.

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
