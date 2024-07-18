"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("node:fs/promises");
myFileReader();
async function myFileReader() {
    const file = await (0, promises_1.open)("./input.txt");
    let t = 0;
    let i = 1;
    let j = 1;
    for await (const line of file.readLines()) {
        const f = /^[^0-9]*([0-9])/.exec(line);
        const l = /([0-9])[^0-9]*$/.exec(line);
        if (f && l) {
            const s = `${f[1]}${l[1]}`;
            t += Number.parseInt(s);
            console.table({ line: i, match: j, first: f[1], last: l[1], sum: s, total: t });
            j++;
        }
        i++;
    }
    console.log(t);
}
