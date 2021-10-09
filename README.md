# Deprecated

**DEPRECATED:** Use
**[`picocolors`](https://github.com/alexeyraspopov/picocolors)** instead.
It is 3 times smaller and 50% faster.

The space in node_modules including sub-dependencies:

```diff
- nanocolors   16 kB
+ picocolors    7 kB
```

Library loading time:

```diff
- nanocolors     0.885 ms
+ picocolors     0.470 ms
```

Benchmark for complex use cases:

```diff
- nanocolors     1,088,193 ops/sec
+ picocolors     1,772,265 ops/sec
```

## Old docs

<img align="right" width="128" height="120"
     src="./img/logo.svg"
     title="Nano Colors logo by Roman Shamin">

A tiny and fast Node.js library to ANSI colors to terminal output.

```js
import { green, bold } from 'nanocolors'

console.log(
  green(`Task ${bold('1')} was finished`)
)
```

>Started as a fork
> of [**@jorgebucaran**](https://github.com/jorgebucaran/)’s
> [`colorette`](https://github.com/jorgebucaran/colorette) with hacks
> from [**@lukeed**](https://github.com/lukeed/)’s
> [`kleur`](https://github.com/lukeed/kleur).
> See [changes](https://github.com/ai/nanocolors/wiki/Colorette-Changes)
> between Nano Colors and `colorette`.

<p align="center">
  <img src="./img/example.png" alt="Nano Colors output" width="600">
</p>

<a href="https://evilmartians.com/?utm_source=nanocolors">
  <img src="https://evilmartians.com/badges/sponsored-by-evil-martians.svg"
       alt="Sponsored by Evil Martians" width="236" height="54">
</a>

[ESM]: https://github.com/ai/nanocolors/blob/main/index.js
[CJS]: https://github.com/ai/nanocolors/blob/main/index.cjs


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

4. If you used template tag, then use
   the [`nanocolors-template`](https://github.com/usmanyunusov/nanocolors-template):

   ```diff
   - import chalk from 'chalk'
   + import { colorize } from 'nanocolors-template'

   - chalk.yellow.bold`yellow {red ${"text"}}`
   + colorize`{yellow.bold yellow {red ${"text"}}}`
   ```

Above changes can be applied automatically using
[codemod](https://gist.github.com/gavrix/ff051941ad9a19c8ea3224f38c30bc9a):

```sh
npx jscodeshift FILES -t https://gist.githubusercontent.com/gavrix/ff051941ad9a19c8ea3224f38c30bc9a/raw/09d81e93f880ecbc8f52dcf7819816c81e2ba340/chalk_nanocolors_transform.js
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
