import { open } from "node:fs/promises";

myFileReader();
async function myFileReader() {
  const file = await open("./input.txt");
  const allowed = { red: 12, green: 13, blue: 14 };
  const gamesPossible = [];
  const gamesImpossible = [];
  for await (const line of file.readLines()) {
    let possible = true;
    const [game, results] = line.split(":");
    const gameId = Number(game.split(" ")[1]);
    //
    const resultMatches = [
      ...results.matchAll(/(?: (\d+) (red|green|blue)[,;]?)/g),
    ];
    for (const result of resultMatches) {
      const [_, count, color] = result;
      if (color === "red" || color === "green" || color === "blue") {
        if (Number(count) > allowed[color]) {
          possible = false;
        }
      }
    }
    if (possible) {
      gamesPossible.push(gameId);
    } else {
      gamesImpossible.push(gameId);
    }
    console.log(gameId, possible);
  }
  const possibleIdSum = gamesPossible.reduce((a, b) => a + b, 0);
  console.log(possibleIdSum);
}
