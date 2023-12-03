import { open } from "node:fs/promises";
myFileReader();
async function myFileReader() {
  const file = await open("./input.txt");
let totalPower = 0;
  for await (const line of file.readLines()) {
    let min = { red: 0, green: 0, blue: 0 };
    const [game, results] = line.split(":");
    const gameId = Number(game.split(" ")[1]);
    //
    const resultMatches = [
      ...results.matchAll(/(?: (\d+) (red|green|blue)[,;]?)/g),
    ];
    for (const result of resultMatches) {
      const [_, count, color] = result;
      if (color == "red" || color == "green" || color == "blue") {
        if (Number(count) > min[color]) {
          min[color] = Number(count);
        }
      }
    }
    const power = min.red * min.green * min.blue;
    totalPower += power;
    console.log(gameId, min, power, totalPower);
  }
}
