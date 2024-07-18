import { open } from "node:fs/promises";
myFileReader();
async function myFileReader() {
  const file = await open("./input.txt");
  const lines = [];
  let sum = 0;
  for await (const line of file.readLines()) {
    lines.push([...line]);
  }
  function isPartNumber(i:number,j:number, lines: string[][]){
    if (/[0-9]/.exec(lines[i][j])) {
      if(i>0&&j>0                               ){if(/[^0-9.]/.exec(lines[i-1][j-1])){return true;}}
      if(i>0                                    ){if(/[^0-9.]/.exec(lines[i-1][j])){return true;}}
      if(i>0&&j<lines[i].length-1               ){if(/[^0-9.]/.exec(lines[i-1][j+1])){return true;}}
      if(j>0                                    ){if(/[^0-9.]/.exec(lines[i][j-1])){return true;}}
      if(j<lines[i].length-1                    ){if(/[^0-9.]/.exec(lines[i][j+1])){return true;}}
      if(i<lines.length-1&&j>0                  ){if(/[^0-9.]/.exec(lines[i+1][j-1])){return true;}}
      if(i<lines.length-1                       ){if(/[^0-9.]/.exec(lines[i+1][j])){return true;}}
      if(i<lines.length-1&&j<lines[i].length-1  ){if(/[^0-9.]/.exec(lines[i+1][j+1])){return true;}}
    }
    return false;
  }
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      let partNumber = isPartNumber(i,j,lines);
      if (/[0-9]/.exec(lines[i][j])) {
        let num = "";
        while (/[0-9]/.exec(lines[i][j])){
          partNumber = partNumber? partNumber: isPartNumber(i,j,lines);
          num += `${lines[i][j]}`;
          j++;
        }
        console.log(num, partNumber);
        if(partNumber){
          // biome-ignore lint/style/useNumberNamespace: <explanation>
          sum += parseInt(num);
        }
      }
    }
  }
  console.log(sum);
}
