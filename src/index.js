import "./styles.css";

import Events from "./factories/events.js";
import Display from "./factories/display.js";
import Ship from "./factories/ship.js";
import Gameboard from "./factories/gameboard.js";
import Player from "./factories/player.js";
import GameController from "./factories/gamecontroller.js";

const Index = (() => {
  document.addEventListener("DOMContentLoaded", () => {
    Events.publish("page:loaded");
  });
})();
