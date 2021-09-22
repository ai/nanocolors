type Color = (text: string | number) => string;

export interface Colors {
  isColorSupported: boolean;
  reset: Color;
  bold: Color;
  dim: Color;
  italic: Color;
  underline: Color;
  inverse: Color;
  hidden: Color;
  strikethrough: Color;
  black: Color;
  red: Color;
  green: Color;
  yellow: Color;
  blue: Color;
  magenta: Color;
  cyan: Color;
  white: Color;
  gray: Color;
  bgBlack: Color;
  bgRed: Color;
  bgGreen: Color;
  bgYellow: Color;
  bgBlue: Color;
  bgMagenta: Color;
  bgCyan: Color;
  bgWhite: Color;
}

export let isColorSupported = !Deno.noColor;

let nope: Color = (s) => String(s);

function hasClosed(s: string | number, close: string): s is string {
  return !!~("" + s).indexOf(close, 4);
}

function color(openCode: number, closeCode: number): Color {
  let open = `\x1b[${openCode}m`;
  let close = `\x1b[${closeCode}m`;

  return (s) => {
    if (s === "") {
      return s;
    } else {
      return (
        open +
        (hasClosed(s, close)
          ? s.replace(new RegExp(`\\x1b\\[${closeCode}m`, "g"), open)
          : s) +
        close
      );
    }
  };
}

export function createColors(enabled = isColorSupported): Colors {
  if (enabled) {
    return {
      isColorSupported: true,

      // Modifiers
      reset: color(0, 0),
      bold: color(1, 22),
      dim: color(2, 22),
      italic: color(3, 23),
      underline: color(4, 24),
      inverse: color(7, 27),
      hidden: color(8, 28),
      strikethrough: color(9, 29),

      // Colors
      black: color(30, 39),
      red: color(31, 39),
      green: color(32, 39),
      yellow: color(33, 39),
      blue: color(34, 39),
      magenta: color(35, 39),
      cyan: color(36, 39),
      white: color(37, 39),
      gray: color(90, 39),

      // Background
      bgBlack: color(40, 49),
      bgRed: color(41, 49),
      bgGreen: color(42, 49),
      bgYellow: color(43, 49),
      bgBlue: color(44, 49),
      bgMagenta: color(45, 49),
      bgCyan: color(46, 49),
      bgWhite: color(47, 49),
    };
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

      // Colors
      black: nope,
      red: nope,
      green: nope,
      yellow: nope,
      blue: nope,
      magenta: nope,
      cyan: nope,
      white: nope,
      gray: nope,

      // Background
      bgBlack: nope,
      bgRed: nope,
      bgGreen: nope,
      bgYellow: nope,
      bgBlue: nope,
      bgMagenta: nope,
      bgCyan: nope,
      bgWhite: nope,
    };
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
  bgWhite,
} = createColors(isColorSupported);
