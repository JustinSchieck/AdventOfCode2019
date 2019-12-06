var mass = require("./constants");

console.log("values: ", mass.length);
console.log("*********************");

let fuelTotal = 0;

const getTotal = array => {
  let total = 0;
  for (let i = 0; i < array.length; i++) {
    total += array[i];
  }
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
