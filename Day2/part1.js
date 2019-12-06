const fs = require("fs");

const inputStr = fs
  .readFileSync("input.txt", "UTF-8")
  .split(",")
  .map(Number);

const IntCodeAlarm = (r1, r2) => {
  const value = inputStr.slice();

  //replacements set from 12 and 2
  value[1] = r1;
  value[2] = r2;

  let startPos = 0;

  while (value[startPos] !== 99) {
    const xIdx = value[startPos + 1];
    const yIdx = value[startPos + 2];
    const x = value[xIdx];
    const y = value[yIdx];

    const outputInd = value[startPos + 3];
    //calc
    const output = value[startPos] === 1 ? x + y : x * y;

    value[outputInd] = output;
    startPos += 4;
  }

  return value[0];
};

console.log(IntCodeAlarm(12, 2));
