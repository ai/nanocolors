import tty from 'tty'

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

export let isColorSupported =
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

let close39 = '\x1b[39m'
let close49 = '\x1b[49m'
let regexp39 = /\x1b\[39m/g
let regexp49 = /\x1b\[49m/g

export function createColors(enabled = isColorSupported) {
  if (enabled) {
    return {
      isColorSupported: true,
      reset: s => `\x1b[0m${s}\x1b[0m`,
      bold: color('\x1b[1m', '\x1b[22m', /\x1b\[22m/g),
      dim: color('\x1b[2m', '\x1b[22m', /\x1b\[22m/g),
      italic: color('\x1b[3m', '\x1b[23m', /\x1b\[23m/g),
      underline: color('\x1b[4m', '\x1b[24m', /\x1b\[24m/g),
      inverse: color('\x1b[7m', '\x1b[27m', /\x1b\[27m/g),
      hidden: color('\x1b[8m', '\x1b[28m', /\x1b\[28m/g),
      strikethrough: color('\x1b[9m', '\x1b[29m', /\x1b\[29m/g),
      black: color('\x1b[30m', close39, regexp39),
      red: color('\x1b[31m', close39, regexp39),
      green: color('\x1b[32m', close39, regexp39),
      yellow: color('\x1b[33m', close39, regexp39),
      blue: color('\x1b[34m', close39, regexp39),
      magenta: color('\x1b[35m', close39, regexp39),
      cyan: color('\x1b[36m', close39, regexp39),
      white: color('\x1b[37m', close39, regexp39),
      gray: color('\x1b[90m', close39, regexp39),
      bgBlack: color('\x1b[40m', close49, regexp49),
      bgRed: color('\x1b[41m', close49, regexp49),
      bgGreen: color('\x1b[42m', close49, regexp49),
      bgYellow: color('\x1b[43m', close49, regexp49),
      bgBlue: color('\x1b[44m', close49, regexp49),
      bgMagenta: color('\x1b[45m', close49, regexp49),
      bgCyan: color('\x1b[46m', close49, regexp49),
      bgWhite: color('\x1b[47m', close49, regexp49)
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

export let {
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


const colors = {
  red: {
    start: '\x1b[31m',
    end: close39
  }
}
/**
 *
 * @param {string[]} strings
 * @param  {...string} args
 * @example
 * color
 * colorize`{red this} is red color text`
 * const text = 'text'
 * colorize`{red ${text}} is red color text`
 */
export function colorize(strings, ...args) {
  const openTag = '{';
  const closeTag = '}';
  const space = ' ';

  const colorStack = [];
  const wrapperStack = [];

  const result = ''

  const templateArgs = []
  for (let i = 0; i < strings.length; i++) {
    let str = strings[i];
    if (str) {
      const startIndex = str.indexOf(openTag);
      const endIndex = str.indexOf(closeTag);

      if (startIndex === -1 && endIndex === -1) {
        console.log(str)
        templateArgs.push(str);
      } else {
        if (startIndex !== -1) {
          const preStr = str.substring(0, startIndex);
          if (preStr) {
            templateArgs.push(preStr);
          }
          const spaceIndex = str.indexOf(space, startIndex);
          const mark = str.substring(startIndex + 1, spaceIndex);
          str = str.substring(spaceIndex + 1);

          wrapperStack.push(templateArgs.length);
          colorStack.push(mark);
          console.log(str, colorStack)

          const endIndex = str.indexOf(closeTag);
          if (endIndex !== -1) {
            console.log(str, endIndex)
            const midStr = str.substring(0, endIndex);
            templateArgs.push(midStr)
            mergeColor(colorStack, wrapperStack, templateArgs)
            const endStr = str.substring(midStr.length + 1);
            templateArgs.push(endStr)
          } else {
            str = str.substring(startIndex + 1);
            templateArgs.push(str)
          }
        }
        if (startIndex === -1 && endIndex !== -1) {
          mergeColor(colorStack, wrapperStack, templateArgs)
          const endStr = str.substring(endIndex + 1);
          templateArgs.push(endStr)
        }
      }
    }
    if (args[i]) {
      templateArgs.push(args[i])
    }
  }

  console.log(templateArgs.join(''))
}


function mergeColor(colorStack, wrapperStack, templateArgs) {
  if (colorStack.length && wrapperStack.length) {
    let length = templateArgs.length - wrapperStack.pop()
    const color = colorStack.pop()
    let result = colors[color] ? colors[color].start : `{${color} `
    while (length > 0) {
      const currentStr = templateArgs.pop()
      result += currentStr
      length--
    }
    result += colors[color] ? colors[color].end : '}'
    templateArgs.push(result)
  }
}

