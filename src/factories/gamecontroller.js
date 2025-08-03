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

    newShipHuman(players.human.gb, [0, 0], [0, 4]);
    newShipHuman(players.human.gb, [2, 0], [2, 2]);
    newShipHuman(players.human.gb, [9, 9], [9, 9]);

    newShipAi(players.ai.gb, [5, 0], [5, 4]);

    setUpAttackButtons();
  }

  function newShipHuman(board, from, to) {
    board.newShip(from, to, "ship");
    Events.publish("ship:added", players);
  }

  function newShipAi(board, from, to) {
    board.newShip(from, to, "ai-ship");
    Events.publish("ship:added", players);
  }

  function setUpAttackButtons() {
    const buttons = Array.from(document.querySelectorAll(".cell")).slice(
      100,
      200,
    );

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        let coords = [Number(button.id[0]), Number(button.id[2])];
        players.ai.gb.receiveAttack(coords);
      });
    });
  }

  Events.subscribe("page:loaded", initialSetup);
})();
