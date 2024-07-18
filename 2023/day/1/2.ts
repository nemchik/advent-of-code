import { open } from "node:fs/promises";
myFileReader();
async function myFileReader() {
  const file = await open("./input.txt");
  let t = 0;
  let i = 1;
  let j = 1;
  function getNumber(s: string) {
    switch (s) {
      case "one":
        return 1;
      case "two":
        return 2;
      case "three":
        return 3;
      case "four":
        return 4;
      case "five":
        return 5;
      case "six":
        return 6;
      case "seven":
        return 7;
      case "eight":
        return 8;
      case "nine":
        return 9;
      default:
        return Number.parseInt(s);
    }
  }
  for await (const line of file.readLines()) {
    const f =
      /^(?:(?![0-9]|one|two|three|four|five|six|seven|eight|nine).)*([0-9]|one|two|three|four|five|six|seven|eight|nine)/.exec(
        line
      );
    const l =
      /([0-9]|one|two|three|four|five|six|seven|eight|nine)(?:.(?<![0-9]|one|two|three|four|five|six|seven|eight|nine))*$/.exec(
        line
      );
    if (f && l) {
      const s = `${getNumber(f[1])}${getNumber(l[1])}`;
      t += Number.parseInt(s);
      console.table({line: i, match: j, first: f[1], last: l[1], sum: s, total: t});
      j++;
    }
    i++;
  }
  console.log(t);
}
