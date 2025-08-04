import Events from "./events.js";
import Ship from "./ship.js";

const Gameboard = () => {
  const board = {
    min: 0,
    max: 9,
    maxShipSize: 5,
    minShipSize: 1,
    occupied: new Set(),
    totalShips: 0,
    sunkenShips: 0,
    attacked: new Set(),
    domElements: [],
  };
  const messages = {
    placeShip: "Place your ships",
    hitWater: "You hit water",
    hitShip: "You hit an enemy ship",
    sunkShip: "You sunk an enemy ship",
    win: "You win! All enemy ships are gone, congratulations.",
    aiHitWater: "The enemy hit water",
    aiHitShip: "The enemy hit one of your ships",
    aiSunkShip: "The enemy sunk one of your ships",
    aiWin: "You lose, all your ships are gone.",
  };
  const ships = [];

  (function createDivs() {
    for (let i = 0; i <= board.max; i++) {
      for (let j = 0; j <= board.max; j++) {
        const button = document.createElement("button");
        button.classList.add("cell");
        button.id = `${i},${j}`;
        board.domElements.push(button);
      }
    }
  })();

  function receiveAttack(coord, from) {
    let shipId = isOccupied([coord])[0];

    for (const entry of board.attacked) {
      if (entry === coord.toString()) {
        return false;
      }
    }

    board.attacked.add(coord.toString());

    if (shipId) {
      for (let ship of ships) {
        if (shipId === ship.id.toString()) {
          ship.ship.hit();
          if (ship.ship.isSunk()) {
            board.sunkenShips++;
            if (from === "human") {
              Events.publish("message:updated", messages.sunkShip);
            } else {
              Events.publish("message:updated", messages.aiSunkShip);
            }
          } else {
            if (from === "human") {
              Events.publish("message:updated", messages.hitShip);
            } else {
              Events.publish("message:updated", messages.aiHitShip);
            }
          }
        }
      }

      for (let button of board.domElements) {
        if (button.id === coord.toString()) {
          button.classList.add("ship");
          button.classList.add("hit");
        }
      }

      if (board.sunkenShips === board.totalShips) {
        Events.publish("message:updated", messages.win);
      }
      return true;
    }

    for (let button of board.domElements) {
      if (button.id === coord.toString()) {
        button.classList.add("water");
      }
    }
    if (from === "human") {
      Events.publish("message:updated", messages.hitWater);
    } else {
      Events.publish("message:updated", messages.aiHitWater);
    }
    return true;
  }

  function newShip(from, to, tag = undefined) {
    if (invalidShape(from, to)) return false;
    if (outOfBounds(from) || outOfBounds(to)) return false;

    const size = Math.abs(from[0] - to[0] || from[1] - to[1]) + 1;

    if (invalidShipSize(size)) return false;

    const ship = {
      id: ships.length,
      ship: Ship(size),
      path: traversePath(from, to),
    };

    if (isOccupied(ship.path)) return false;

    registerOccupiedCoords(ship, tag);
    ships.push(ship);
    board.totalShips++;

    return true;
  }

  function isOccupied(path) {
    for (let cell of board.occupied) {
      for (let coord of path) {
        if (coord.toString() === cell.split(":")[1]) return cell.split(":");
      }
    }
    return false;
  }

  // Register the occupied cells using shipdId:coord format
  function registerOccupiedCoords(ship, tag) {
    for (let coord of ship.path) {
      board.occupied.add(`${ship.id}:${coord}`);

      if (tag) {
        for (let button of board.domElements) {
          if (button.id === coord.toString()) {
            button.classList.add(tag);
          }
        }
      }
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
      fixedNum = from[1];
      factor = 1;
      fixedAxis = "x";
      target = to[0];
    }

    return [fixedNum, varyingNum, factor, fixedAxis, target];
  }

  function invalidShipSize(size) {
    return size < board.minShipSize || size > board.maxShipSize;
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
    board,
  };
};

export default Gameboard;
