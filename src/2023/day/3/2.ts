import { open } from "node:fs/promises";

myFileReader();
async function myFileReader() {
  const file = await open("./input.txt");
  const lines = [];
  let sum = 0;
  for await (const line of file.readLines()) {
    lines.push([...line]);
  }
  function getFullNumber(n: number, line: string[]) {
    let j = n;
    let num = "";
    while (/[0-9]/.exec(line[j - 1])) {
      j--;
    }
    while (/[0-9]/.exec(line[j])) {
      num += `${line[j]}`;
      j++;
    }
    return Number.parseInt(num);
  }
  function getGearParts(i: number, j: number, lines: string[][]) {
    const adjParts = [];
    if (/[*]/.exec(lines[i][j])) {
      let tl = false;
      let tm = false;
      let tr = false;
      let ml = false;
      let mr = false;
      let bl = false;
      let bm = false;
      let br = false;
      if (i > 0 && j > 0) {
        if (/[0-9]/.exec(lines[i - 1][j - 1])) {
          tl = true;
        }
      }
      if (i > 0) {
        if (/[0-9]/.exec(lines[i - 1][j])) {
          tm = true;
        }
      }
      if (i > 0 && j < lines[i].length - 1) {
        if (/[0-9]/.exec(lines[i - 1][j + 1])) {
          tr = true;
        }
      }
      if (j > 0) {
        if (/[0-9]/.exec(lines[i][j - 1])) {
          ml = true;
        }
      }
      if (j < lines[i].length - 1) {
        if (/[0-9]/.exec(lines[i][j + 1])) {
          mr = true;
        }
      }
      if (i < lines.length - 1 && j > 0) {
        if (/[0-9]/.exec(lines[i + 1][j - 1])) {
          bl = true;
        }
      }
      if (i < lines.length - 1) {
        if (/[0-9]/.exec(lines[i + 1][j])) {
          bm = true;
        }
      }
      if (i < lines.length - 1 && j < lines[i].length - 1) {
        if (/[0-9]/.exec(lines[i + 1][j + 1])) {
          br = true;
        }
      }

      console.table([
        [tl, tm, tr],
        [ml, "*", mr],
        [bl, bm, br],
      ]);

      if (tl && tm && tr) {
        adjParts.push(getFullNumber(j - 1, lines[i - 1]));
      }
      if (tl && tm && !tr) {
        adjParts.push(getFullNumber(j - 1, lines[i - 1]));
      }
      if (tl && !tm && !tr) {
        adjParts.push(getFullNumber(j - 1, lines[i - 1]));
      }
      if (!tl && tm && tr) {
        adjParts.push(getFullNumber(j, lines[i - 1]));
      }
      if (!tl && !tm && tr) {
        adjParts.push(getFullNumber(j + 1, lines[i - 1]));
      }
      if (!tl && tm && !tr) {
        adjParts.push(getFullNumber(j, lines[i - 1]));
      }
      if (tl && !tm && tr) {
        adjParts.push(getFullNumber(j - 1, lines[i - 1]));
        adjParts.push(getFullNumber(j + 1, lines[i - 1]));
      }

      if (bl && bm && br) {
        adjParts.push(getFullNumber(j - 1, lines[i + 1]));
      }
      if (bl && bm && !br) {
        adjParts.push(getFullNumber(j - 1, lines[i + 1]));
      }
      if (bl && !bm && !br) {
        adjParts.push(getFullNumber(j - 1, lines[i + 1]));
      }
      if (!bl && bm && br) {
        adjParts.push(getFullNumber(j, lines[i + 1]));
      }
      if (!bl && !bm && br) {
        adjParts.push(getFullNumber(j + 1, lines[i + 1]));
      }
      if (!bl && bm && !br) {
        adjParts.push(getFullNumber(j, lines[i + 1]));
      }
      if (bl && !bm && br) {
        adjParts.push(getFullNumber(j - 1, lines[i + 1]));
        adjParts.push(getFullNumber(j + 1, lines[i + 1]));
      }

      if (ml) {
        adjParts.push(getFullNumber(j - 1, lines[i]));
      }
      if (mr) {
        adjParts.push(getFullNumber(j + 1, lines[i]));
      }
    }
    return adjParts;
  }
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      if (/[*]/.exec(lines[i][j])) {
        const partNumbers = getGearParts(i, j, lines);
        if (partNumbers.length === 2) {
          const [partA, partB] = partNumbers;
          sum += partA * partB;
        }
      }
    }
  }

  console.log(sum);
}
