let nope = s => String(s)

let isColorSupported = false
let reset = nope
let bold = nope
let dim = nope
let italic = nope
let underline = nope
let inverse = nope
let hidden = nope
let strikethrough = nope
let black = nope
let red = nope
let green = nope
let yellow = nope
let blue = nope
let magenta = nope
let cyan = nope
let white = nope
let gray = nope
let bgBlack = nope
let bgRed = nope
let bgGreen = nope
let bgYellow = nope
let bgBlue = nope
let bgMagenta = nope
let bgCyan = nope
let bgWhite = nope

function createColors() {
  return {
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
    bgWhite
  }
}

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
