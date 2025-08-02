import Ship from "./ship.js";

const Gameboard = () => {
  const board = {
    min: 0,
    max: 9,
    occupied: new Set(),
    totalShips: 0,
    sunkenShips: 0,
    attacked: new Set(),
  };
  const ships = [];

  function receiveAttack(coord) {
    let shipId;
    console.log(board.occupied);
    for (let entry of board.occupied) {
      console.log("aljsdklajsdlajs");
    }
    for (let ship of ships) {
      if (ship.id == shipId) {
        ship.hit();
        if (ship.isSunk()) board.sunkenShips++;
        return "ship";
      }
    }
    board.attacked.add(coord.toString());
    return "water";
  }

  function newShip(from, to) {
    if (invalidShape(from, to)) return false;
    if (outOfBounds(from) || outOfBounds(to)) return false;

    const size = Math.abs(from[0] - to[0] || from[1] - to[1]) + 1;

    const ship = {
      id: ships.length,
      ship: Ship(size),
      path: traversePath(from, to),
    };

    if (isOccupied(ship.path)) return false;

    registerOccupiedCoords(ship);
    ships.push(ship);
    board.totalShips++;

    return true;
  }

  function isOccupied(path) {
    for (let cell of board.occupied) {
      for (let coord of path) {
        if (coord.toString() === cell.split(":")[1]) {
          return true;
        }
      }
    }
    return false;
  }

  // Register the occupied cells using shipdId:coord format
  function registerOccupiedCoords(ship) {
    for (let coord of ship.path) {
      board.occupied.add(`${ship.id}:${coord}`);
    }
  }

  function traversePath(from, to) {
    let [fixedNum, varyingNum, factor, fixedAxis, target] = getDiff(from, to);
    let path = [];

    while (varyingNum !== target + factor) {
      let coord =
        fixedAxis === "x" ? [fixedNum, varyingNum] : [varyingNum, fixedNum];
      path.push(coord);
      varyingNum += factor;
    }

    return path;
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
    receiveAttack,
  };
};

export default Gameboard;
