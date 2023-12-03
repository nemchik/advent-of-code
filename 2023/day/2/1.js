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
        const allowed = { red: 12, green: 13, blue: 14 };
        const gamesPossible = [];
        const gamesImpossible = [];
        try {
            for (var _d = true, _e = __asyncValues(file.readLines()), _f; _f = yield _e.next(), _a = _f.done, !_a; _d = true) {
                _c = _f.value;
                _d = false;
                const line = _c;
                let possible = true;
                const [game, results] = line.split(":");
                const gameId = Number(game.split(" ")[1]);
                //
                const resultMatches = [
                    ...results.matchAll(/(?: (\d+) (red|green|blue)[,;]?)/g),
                ];
                for (const result of resultMatches) {
                    const [_, count, color] = result;
                    if (color == "red" || color == "green" || color == "blue") {
                        if (Number(count) > allowed[color]) {
                            possible = false;
                        }
                    }
                }
                if (possible) {
                    gamesPossible.push(gameId);
                }
                else {
                    gamesImpossible.push(gameId);
                }
                console.log(gameId, possible);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
            }
            finally { if (e_1) throw e_1.error; }
        }
        const possibleIdSum = gamesPossible.reduce((a, b) => a + b, 0);
        console.log(possibleIdSum);
    });
}
