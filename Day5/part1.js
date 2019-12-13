const fs = require("fs");

const inputStr = fs
  .readFileSync("input.txt", "UTF-8")
  .split(",")
  .map(Number);

// const inputStr = fs
//   .readFileSync("inputday2.txt", "UTF-8")
//   .split(",")
//   .map(Number);

const IntCodeAlarm = input => {
  let value = inputStr;
  let stop = false;
  for (let i = 0; i < value.length && !stop; ) {
    const instruction = value.slice(i, i + 4);
    const opcode = instruction[0] % 100;
    const mode = instruction[0].toString().padStart(5, "0");

    const getValue = index => {
      //checks if position mode if value of index is 0 loosely
      const posMode = mode[3 - index] == "0";
      // this is for a number that is 000opcode, removes the leading 0 and gets the remaining code
      if (posMode) {
        return value[instruction[index]];
      } else {
        return instruction[index];
      }
    };
    switch (opcode) {
      case 1:
        value[instruction[3]] = getValue(1) + getValue(2);
        //set new start value
        i += 4;
        break;
      case 2:
        value[instruction[3]] = getValue(1) * getValue(2);
        //set new start value
        i += 4;
        break;
      case 3:
        //removes first element from array and returns it to the value[1]
        value[instruction[1]] = input.shift();
        //set new start value
        i += 2;
        break;
      case 4:
        //set new start value
        console.log(getValue(1));
        i += 2;
        break;
      //Test system below!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      case 5: // jump-if-true
        if (getValue(1) != 0) {
          i = getValue(2);
        } else {
          i += 3;
        }
        break;
      case 6: // jump-if-false
        if (getValue(1) == 0) {
          i = getValue(2);
        } else {
          i += 3;
        }
        break;
      case 7: //less than
        if (getValue(1) < getValue(2)) {
          value[instruction[3]] = 1;
        } else {
          value[instruction[3]] = 0;
        }
        i += 4;
        break;
      case 8: // equals to
        if (getValue(1) == getValue(2)) {
          value[instruction[3]] = 1;
        } else {
          value[instruction[3]] = 0;
        }
        i += 4;
        break;
      case 99:
        stop = true;
        break;
      default:
        stop = true;
        console.log("Failure Wrong code at pos: ", i, ":", instruction[0]);
        break;
    }
  }
  return value[0];
};

const input = [5];

console.log(IntCodeAlarm(input));
