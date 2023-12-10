"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("node:fs/promises");
myFileReader();
function myFileReader() {
    var _a, e_1, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const file = yield (0, promises_1.open)("./input.txt");
        let lines = [];
        let sum = 0;
        try {
            for (var _d = true, _e = __asyncValues(file.readLines()), _f; _f = yield _e.next(), _a = _f.done, !_a; _d = true) {
                _c = _f.value;
                _d = false;
                const line = _c;
                lines.push([...line]);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
            }
            finally { if (e_1) throw e_1.error; }
        }
        function getFullNumber(j, line) {
            let num = "";
            while (/[0-9]/.exec(line[j - 1])) {
                j--;
            }
            while (/[0-9]/.exec(line[j])) {
                num += "" + line[j];
                j++;
            }
            return parseInt(num);
        }
        function getGearParts(i, j, lines) {
            let adjParts = [];
            if (/[\*]/.exec(lines[i][j])) {
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
                console.table([[tl, tm, tr],
                    [ml, "*", mr],
                    [bl, bm, br]]);
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
                if (/[\*]/.exec(lines[i][j])) {
                    const partNumbers = getGearParts(i, j, lines);
                    if (partNumbers.length == 2) {
                        const [partA, partB] = partNumbers;
                        sum += partA * partB;
                    }
                }
            }
        }
        console.log(sum);
    });
}
