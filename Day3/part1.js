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

const distances1 = {};

//maps the wires with x, y coords in two arrays passed in
const getCoords = (wire, arrayToFill, distances) => {
  let x = 0;
  let y = 0;
  let newX = 0;
  let newY = 0;
  let distance = 1;

  for (let i = 0; i < wire.length; i++) {
    const direction = wire[i].charAt(0);
    const dist = wire[i].substr(1);

    switch (direction) {
      case "U":
        for (let i = 0; i < dist; i++) {
          newY = y++;
          arrayToFill.push({ x, y: newY });
          distances[{ x, y: newY }] = distance;
          distance++;
        }
        break;
      case "D":
        for (let i = 0; i < dist; i++) {
          newY = y--;
          arrayToFill.push({ x, y: newY });
          distances[{ x, y: newY }] = distance;
          distance++;
        }
        break;
      case "L":
        for (let i = 0; i < dist; i++) {
          newX = x--;
          arrayToFill.push({ x: newX, y });
          distances[{ x: newX, y }] = distance;
          distance++;
        }
        break;
      case "R":
        for (let i = 0; i < dist; i++) {
          newX = x++;
          arrayToFill.push({ x: newX, y });
          distances[{ x: newX, y }] = distance;
          distance++;
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
  return wireOne.filter(coords => {
    return wireTwo.some(
      coords2 => coords2.x === coords.x && coords2.y === coords.y
    );
  });
};

//make value passed in positive
const makePos = v => Math.abs(v);

const findManhattanDistance = () => {
  const commonVal = findIntersections(intersections, intersections2);
  //makes x and y values positive
  const manDis = commonVal.map(coord => makePos(coord.x) + makePos(coord.y));

  //removes the 0 point
  const result = manDis.filter(ind => ind !== 0);

  //returns lowest value
  const finalResult = Math.min(...result);
  return finalResult;
};

console.log(getCoords(wire1, intersections, distances1));
console.log(getCoords(wire2, intersections2, distances1));

console.log(findManhattanDistance());
