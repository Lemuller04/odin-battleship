import Events from "./events.js";
import Player from "./player.js";

const GameController = (() => {
  let players;

  function initialSetup() {
    players = {
      human: Player(),
      ai: Player(),
    };

    Events.publish("players:created", players);
  }

  Events.subscribe("page:loaded", initialSetup);
})();
