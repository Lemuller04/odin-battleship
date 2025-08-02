import "./styles.css";

import Events from "./factories/events.js";
import GameController from "./factories/gamecontroller.js";
import Ship from "./factories/ship.js";
import Gameboard from "./factories/gameboard.js";
import Player from "./factories/player.js";

const Index = (() => {
  document.addEventListener("DOMContentLoaded", () => {
    Events.publish("page:loaded");
  });
})();
