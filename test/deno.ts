import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.108.0/testing/asserts.ts";

import * as main from "../mod.ts";

Deno.test("prints colors", () => {
  let colors = main.createColors(true);
  assert(colors.isColorSupported);
  let output = Object.entries(colors)
    .filter(([name]) => name !== "isColorSupported" && name !== "reset")
    .reduce(
      (all, [name, fn]) => `${all}\n${name.padEnd(13)} ${fn(name)}`,
      `\x1b[1mreset         ${colors.reset("reset")}`,
    );
  assertEquals(
    output,
    "\x1B[1mreset         \x1B[0mreset\x1B[0m\n" +
      "bold          \x1B[1mbold\x1B[22m\n" +
      "dim           \x1B[2mdim\x1B[22m\n" +
      "italic        \x1B[3mitalic\x1B[23m\n" +
      "underline     \x1B[4munderline\x1B[24m\n" +
      "inverse       \x1B[7minverse\x1B[27m\n" +
      "hidden        \x1B[8mhidden\x1B[28m\n" +
      "strikethrough \x1B[9mstrikethrough\x1B[29m\n" +
      "black         \x1B[30mblack\x1B[39m\n" +
      "red           \x1B[31mred\x1B[39m\n" +
      "green         \x1B[32mgreen\x1B[39m\n" +
      "yellow        \x1B[33myellow\x1B[39m\n" +
      "blue          \x1B[34mblue\x1B[39m\n" +
      "magenta       \x1B[35mmagenta\x1B[39m\n" +
      "cyan          \x1B[36mcyan\x1B[39m\n" +
      "white         \x1B[37mwhite\x1B[39m\n" +
      "gray          \x1B[90mgray\x1B[39m\n" +
      "bgBlack       \x1B[40mbgBlack\x1B[49m\n" +
      "bgRed         \x1B[41mbgRed\x1B[49m\n" +
      "bgGreen       \x1B[42mbgGreen\x1B[49m\n" +
      "bgYellow      \x1B[43mbgYellow\x1B[49m\n" +
      "bgBlue        \x1B[44mbgBlue\x1B[49m\n" +
      "bgMagenta     \x1B[45mbgMagenta\x1B[49m\n" +
      "bgCyan        \x1B[46mbgCyan\x1B[49m\n" +
      "bgWhite       \x1B[47mbgWhite\x1B[49m",
  );
});

Deno.test("supports nested colors", () => {
  let { green, red } = main.createColors(true);
  assertEquals(
    green("a " + red("b") + " c"),
    "\x1B[32ma \x1B[31mb\x1B[32m c\x1B[39m",
  );
});

Deno.test("disables colors", () => {
  let noColors = main.createColors(false);
  assert(!noColors.isColorSupported);
  let keys = Object.keys(noColors) as (keyof main.Colors)[];
  keys.forEach((name) => {
    if (name !== "isColorSupported") {
      assertEquals(noColors[name]("text"), "text");
    }
  });
});

Deno.test("copies all methods", () => {
  let created = Object.keys(main.createColors(true));
  assertEquals(
    Object.keys(main).sort(),
    created.concat(["createColors"]).sort(),
  );
});

Deno.test("does not add modifiers to empty string", () => {
  let { green } = main.createColors(true);
  assertEquals(green(""), "");
});

Deno.test("converts number to string on disabled colors", () => {
  let noColors = main.createColors(false);
  assertEquals(typeof noColors.red(1), "string");
});
