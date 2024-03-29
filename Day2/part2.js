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
    let output = 0;
    
    if(value[startPos] === 1 ){
      output = x + y;
    }else if (value[startPos] === 2){
      output = x * y;
    }

    value[outputInd] = output;
    startPos += 4;
  }

  return value[0];
};

console.log(IntCodeAlarm(12, 2));

const NounVerb = wantedValue => {
  for (let n = 0; n < 100; n++) {
    for (let v = 0; v < 100; v++) {
      const final = IntCodeAlarm(n, v);

      if (final === wantedValue) {
        return 100 * n + v;
      }
    }
  }
};

console.log(NounVerb(19690720));
