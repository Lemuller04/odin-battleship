import Ship from "./ship.js";

const Gameboard = () => {
  const board = {
    min: 0,
    max: 9,
  };
  const ships = [];

  function newShip(from, to) {
    if (invalidShape(from, to)) return false;
    if (outOfBounds(from) || outOfBounds(to)) return false;

    let size = from[0] !== to[0] ? from[0] - to[0] : from[1] - to[1];
    size < 0 ? (size *= -1) : size;

    ships.push(Ship(size));

    return true;
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
