var mass = require("./constants");

let fuelTotal = 0;
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const getTotal = array => {
  let total = 0;
  let totalArray = [];
  let sum = array.reduce(reducer);
  //for each item in the array get the single item
  for (let i = 0; i < array.length; i++) {
    let arrayItem = array[i];

    //While that item is greater than or equal to 0
    while (arrayItem >= 0) {
      //Do the calc by deviding by 3 and round down, then minus 2
      let newAmount = Math.floor(arrayItem / 3) - 2;

      //make array item the new amount and push the amount to total array to be summed
      arrayItem = newAmount;
      let valToPush = arrayItem >= 0 ? newAmount : 0;
      console.log(valToPush);
      totalArray.push(valToPush);
    }

    //get final total as the values above condense into total
    total = totalArray.reduce(reducer);
    total += sum;
  }
  console.log(total);
  return total;
};

const CounterUpper = () => {
  let numToRound = [];
  let total = 0;

  for (let i = 0; i < mass.length; i++) {
    numToRound.push(Math.floor(mass[i] / 3) - 2);
  }
  total = getTotal(numToRound);
  return total;
};

fuelTotal = CounterUpper();
console.log("Counter-Upper Output: ", fuelTotal);
