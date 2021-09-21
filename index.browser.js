let nope = s => s

let isColorSupported = false

// Modifiers
let reset = nope
let bold = nope
let dim = nope
let italic = nope
let underline = nope
let inverse = nope
let hidden = nope
let strikethrough = nope

// Colors
let black = nope
let red = nope
let green = nope
let yellow = nope
let blue = nope
let magenta = nope
let cyan = nope
let white = nope
let gray = nope

// Background
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
    isColorSupported: false,
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
