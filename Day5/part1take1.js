const fs = require("fs");

const inputStr = fs
  .readFileSync("input.txt", "UTF-8")
  .split(",")
  .map(Number);

const IntCodeAlarm = (r1, input) => {
  const value = inputStr.slice();
  let code = 0;

  //replacements set from 12 and 2
  value[1] = r1;
  value[2] = input;

  let startPos = 0;
  let outputInd = 0;
  let output = 0;

  // const getValue = (index, mode) => {
  //   return mode === 0 ? codes[index] : index;
  // };

  while (value[startPos] !== 99) {
    console.log("output: ", output);
    console.log("outputInd: ", outputInd);
    console.log("valueStartPos: ", value[startPos]);
    const instruction = value[startPos] % 10;
    const mode1 = Math.floor(value[startPos] / 100) % 10;
    const mode2 = Math.floor(value[startPos] / 1000) % 10;
    console.log(mode1);
    console.log(mode2);
    const xIdx = value[startPos + 1];
    const yIdx = value[startPos + 2];
    const x = value[xIdx];
    const y = value[yIdx];
    switch (instruction) {
      case 1:
        outputInd = value[startPos + 3];
        //calc
        output = x + y;
        value[outputInd] = output;
        startPos += 4;
        console.log("IN 1: ", output);
        break;
      case 2:
        outputInd = value[startPos + 3];
        output = x * y;
        value[outputInd] = output;
        startPos += 4;
        console.log("IN 2: ", output);
        break;
      case 3:
        outputInd = value[startPos + 1];
        console.log("Output index: ", outputInd);
        //takes value at index 2 and sets it to the proper index
        value[outputInd] === input;
        startPos += 2;
        
        break;
      case 4:
        outputInd = value[startPos + 1];
        code = value[outputInd];
        startPos += 2;
        console.log("IN 4: ", code);
        break;
      default:
        break;
    }
  }
  console.log(code);
  return code;
};

console.log(IntCodeAlarm(12, 5));

// const NounVerb = wantedValue => {
//   for (let n = 0; n < 100; n++) {
//     for (let v = 0; v < 100; v++) {
//       const final = IntCodeAlarm(n, v);

//       if (final === wantedValue) {
//         return 100 * n + v;
//       }
//     }
//   }
// };

// console.log(NounVerb(19690720));
