import Ship from "./ship.js";

const Gameboard = () => {
  const board = {
    min: 0,
    max: 9,
    occupied: new Set(),
  };
  const ships = [];

  function newShip(from, to) {
    if (invalidShape(from, to)) return false;
    if (outOfBounds(from) || outOfBounds(to)) return false;
    if (isOccupied(from, to)) return false;

    const size = Math.abs(from[0] - to[0] || from[1] - to[1]) + 1;

    const ship = {
      id: ships.length,
      ship: Ship(size),
    };

    registerOccupiedCoords(ship, from, to);

    ships.push(ship);
    board.totalShips++;

    return true;
  }

  function isOccupied(from, to) {
    let [fixedNum, varyingNum, factor, fixedAxis, target] = getDiff(from, to);

    while (varyingNum !== target + factor) {
      let coord =
        fixedAxis === "x" ? [fixedNum, varyingNum] : [varyingNum, fixedNum];
      for (let entry of board.occupied) {
        let [coordStr, shipIdStr] = entry.split(":");
        if (coordStr === coord.toString()) return true;
      }
      varyingNum += factor;
    }

    return false;
  }

  function registerOccupiedCoords(ship, from, to) {
    let [fixedNum, varyingNum, factor, fixedAxis, target] = getDiff(from, to);

    while (varyingNum !== target + factor) {
      let coord =
        fixedAxis === "x" ? [fixedNum, varyingNum] : [varyingNum, fixedNum];
      board.occupied.add(`${coord.toString()}:${ship.id}`);
      varyingNum += factor;
    }
  }

  function getDiff(from, to) {
    let fixedNum;
    let varyingNum;
    let factor;
    let fixedAxis;
    let target;

    if (from[0] !== to[0]) {
      varyingNum = from[0];
      fixedNum = from[1];
      factor = from[0] < to[0] ? 1 : -1;
      fixedAxis = "y";
      target = to[0];
    } else if (from[1] !== to[1]) {
      varyingNum = from[1];
      fixedNum = from[0];
      factor = from[1] < to[1] ? 1 : -1;
      fixedAxis = "x";
      target = to[1];
    } else {
      varyingNum = from[0];
      fixedNum = from[0];
      factor = 0;
      fixedAxis = "x";
      target = to[0];
    }

    return [fixedNum, varyingNum, factor, fixedAxis, target];
  }

  function invalidShape(from, to) {
    return from[0] !== to[0] && from[1] !== to[1];
  }

  function outOfBounds(coords) {
    for (let num of coords) {
      if (num < board.min || num > board.max) return true;
    }
    return false;
  }

  return {
    newShip,
  };
};

export default Gameboard;
