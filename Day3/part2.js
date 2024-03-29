const fs = require("fs");

const wire1 = fs
  .readFileSync("input1.txt", "UTF-8")
  .split(",")
  .map(String);

const wire2 = fs
  .readFileSync("input2.txt", "UTF-8")
  .split(",")
  .map(String);

// const wire1 = ["U2", "R4", "U1"];
// const wire2 = ["R2", "U4", "L1"];

const intersections = [];
const intersections2 = [];
let counter = 0;
const distances1 = {};

//maps the wires with x, y coords in two arrays passed in
const getCoords = (wire, arrayToFill, distances) => {
  let x = 0;
  let y = 0;
  let newX = 0;
  let newY = 0;
  let distance = 1;
  let counter = 0;

  for (let i = 0; i < wire.length; i++) {
    const direction = wire[i].charAt(0);
    const dist = wire[i].substr(1);

    switch (direction) {
      case "U":
        for (let i = 0; i < dist; i++) {
          newY = y++;
          arrayToFill.push({ x, y: newY, steps: counter++ });
        }
        break;
      case "D":
        for (let i = 0; i < dist; i++) {
          newY = y--;
          arrayToFill.push({ x, y: newY, steps: counter++ });
        }
        break;
      case "L":
        for (let i = 0; i < dist; i++) {
          newX = x--;
          arrayToFill.push({ x: newX, y, steps: counter++ });
        }
        break;
      case "R":
        for (let i = 0; i < dist; i++) {
          newX = x++;
          arrayToFill.push({ x: newX, y, steps: counter++ });
        }
        break;
      default:
        break;
    }
  }
  return arrayToFill;
};

//finds matching elements between two arrays to find crossing sections of wires
const findIntersections = (wireOne, wireTwo) => {
  let intersections = [];
  console.log("WIRE 1: ", wireOne);
  console.log("WIRE 2: ", wireTwo);
  wireOne.forEach(function(point) {
    wireTwo.forEach(function(point2) {
      if (point.x === point2.x && point.y === point2.y) {
        console.log("POINT!!!!: ", point);
        console.log("POINT2!!!!: ", point2);

        point.steps += point2.steps;
        intersections.push(point);
      }
    });
  });
  return intersections;
};

// return wireOne.filter(coords => {
//     return wireTwo.some(
//         coords2 => coords2.x === coords.x && coords2.y === coords.y
//     );
// });

function getShortestStepCount(intersections) {
  console.log(intersections);
  const arrayOfItems = intersections.filter(ind => ind.x !== 0 && ind.y !== 0);
  console.log(arrayOfItems);

  let steps = arrayOfItems[0].steps;
  console.log(steps);

  arrayOfItems.forEach(point => {
    console.log("POINT: ", point);
    steps = Math.min(steps, point.steps);
  });
  return steps;
}

const part2 = commonVal => {
  return getShortestStepCount(commonVal);
};

//make value passed in positive
const makePos = v => Math.abs(v);

const findManhattanDistance = () => {
  const arrayOfBothWires = [...intersections, ...intersections2];
  const commonVal = findIntersections(intersections, intersections2);

  //makes x and y values positive
  const manDis = commonVal.map(coord => makePos(coord.x) + makePos(coord.y));

  //removes the 0 point
  const result = manDis.filter(ind => ind !== 0);

  //returns lowest value
  const finalResult = Math.min(...result);
  const finalSteps = part2(commonVal);
  console.log(finalResult, finalSteps);
};

console.log(getCoords(wire1, intersections, distances1));
console.log(getCoords(wire2, intersections2, distances1));

console.log(findManhattanDistance());
