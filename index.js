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

function color(openCode, closeCode) {
  let open = `\x1b[${openCode}m`
  let close = `\x1b[${closeCode}m`

  return s => {
    if (s === '') {
      return s
    } else {
      return (
        open +
        (!!~('' + s).indexOf(close, 4)
          ? s.replace(new RegExp(`\\x1b\\[${closeCode}m`, 'g'), open)
          : s) +
        close
      )
    }
  }
}

function createColors(enabled = isColorSupported) {
  if (enabled) {
    return {
      isColorSupported: true,
      reset: color(0, 0),
      bold: color(1, 22),
      dim: color(2, 22),
      italic: color(3, 23),
      underline: color(4, 24),
      inverse: color(7, 27),
      hidden: color(8, 28),
      strikethrough: color(9, 29),
      black: color(30, 39),
      red: color(31, 39),
      green: color(32, 39),
      yellow: color(33, 39),
      blue: color(34, 39),
      magenta: color(35, 39),
      cyan: color(36, 39),
      white: color(37, 39),
      gray: color(90, 39),
      bgBlack: color(40, 49),
      bgRed: color(41, 49),
      bgGreen: color(42, 49),
      bgYellow: color(43, 49),
      bgBlue: color(44, 49),
      bgMagenta: color(45, 49),
      bgCyan: color(46, 49),
      bgWhite: color(47, 49)
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
