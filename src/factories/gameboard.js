import Ship from "./ship.js";

const Gameboard = () => {
  const board = {
    min: 0,
    max: 9,
  };
  const ships = [];

  function newShip(from, to) {
    let size = from[0] !== to[0] ? from[0] - to[0] : from[1] - to[1];
    size < 0 ? (size *= -1) : size;

    ships.push(Ship(size));

    return true;
  }

  return {
    newShip,
  };
};

export default Gameboard;
