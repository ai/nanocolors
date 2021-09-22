let tty = require('tty')

let isDisabled = 'NO_COLOR' in process.env
let isForced = 'FORCE_COLOR' in process.env
let isWindows = process.platform === 'win32'

let isCompatibleTerminal =
  tty && tty.isatty(1) && process.env.TERM && process.env.TERM !== 'dumb'

let isCI =
  'CI' in process.env &&
  ('GITHUB_ACTIONS' in process.env ||
    'GITLAB_CI' in process.env ||
    'CIRCLECI' in process.env)

let isColorSupported =
  !isDisabled && (isForced || isWindows || isCompatibleTerminal || isCI)

let nope = s => String(s)

function color(open, close, closeRegexp) {
  return s => {
    if (s === '') {
      return s
    } else {
      return (
        open +
        (!!~('' + s).indexOf(close, 4) ? s.replace(closeRegexp, open) : s) +
        close
      )
    }
  }
}

let end22 = /\x1b\[22m/g
let end23 = /\x1b\[23m/g
let end24 = /\x1b\[24m/g
let end27 = /\x1b\[27m/g
let end28 = /\x1b\[28m/g
let end29 = /\x1b\[29m/g
let end39 = /\x1b\[39m/g
let end49 = /\x1b\[49m/g

let close39 = '\x1b[39m'
let close49 = '\x1b[49m'

function createColors(enabled = isColorSupported) {
  if (enabled) {
    return {
      isColorSupported: true,
      reset: s => `\x1b[0m${s}\x1b[0m`,
      bold: color('\x1b[1m', '\x1b[22m', end29),
      dim: color('\x1b[2m', '\x1b[22m', end22),
      italic: color('\x1b[3m', '\x1b[23m', end23),
      underline: color('\x1b[4m', '\x1b[24m', end24),
      inverse: color('\x1b[7m', '\x1b[27m', end27),
      hidden: color('\x1b[8m', '\x1b[28m', end28),
      strikethrough: color('\x1b[9m', '\x1b[29m', end29),
      black: color('\x1b[30m', close39, end39),
      red: color('\x1b[31m', close39, end39),
      green: color('\x1b[32m', close39, end39),
      yellow: color('\x1b[33m', close39, end39),
      blue: color('\x1b[34m', close39, end39),
      magenta: color('\x1b[35m', close39, end39),
      cyan: color('\x1b[36m', close39, end39),
      white: color('\x1b[37m', close39, end39),
      gray: color('\x1b[90m', close39, end39),
      bgBlack: color('\x1b[40m', close49, end49),
      bgRed: color('\x1b[41m', close49, end49),
      bgGreen: color('\x1b[42m', close49, end49),
      bgYellow: color('\x1b[43m', close49, end49),
      bgBlue: color('\x1b[44m', close49, end49),
      bgMagenta: color('\x1b[45m', close49, end49),
      bgCyan: color('\x1b[46m', close49, end49),
      bgWhite: color('\x1b[47m', close49, end49)
    }
  } else {
    return {
      isColorSupported: false,
      reset: nope,
      bold: nope,
      dim: nope,
      italic: nope,
      underline: nope,
      inverse: nope,
      hidden: nope,
      strikethrough: nope,
      black: nope,
      red: nope,
      green: nope,
      yellow: nope,
      blue: nope,
      magenta: nope,
      cyan: nope,
      white: nope,
      gray: nope,
      bgBlack: nope,
      bgRed: nope,
      bgGreen: nope,
      bgYellow: nope,
      bgBlue: nope,
      bgMagenta: nope,
      bgCyan: nope,
      bgWhite: nope
    }
  }
}

let {
  reset,
  bold,
  dim,
  italic,
  underline,
  inverse,
  hidden,
  strikethrough,
  black,
  red,
  green,
  yellow,
  blue,
  magenta,
  cyan,
  white,
  gray,
  bgBlack,
  bgRed,
  bgGreen,
  bgYellow,
  bgBlue,
  bgMagenta,
  bgCyan,
  bgWhite
} = createColors(isColorSupported)

module.exports = {
  isColorSupported,
  reset,
  bold,
  dim,
  italic,
  underline,
  inverse,
  hidden,
  strikethrough,
  black,
  red,
  green,
  yellow,
  blue,
  magenta,
  cyan,
  white,
  gray,
  bgBlack,
  bgRed,
  bgGreen,
  bgYellow,
  bgBlue,
  bgMagenta,
  bgCyan,
  bgWhite,
  createColors
}
