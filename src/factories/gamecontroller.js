import Events from "./events.js";
import Player from "./player.js";

const GameController = (() => {
  let players;
  let humanTurn = true;

  function initialSetup() {
    players = {
      human: Player(),
      ai: Player(),
    };

    Events.publish("players:created", players);

    newShipHuman(players.human.gb, [0, 0], [0, 4]);
    newShipHuman(players.human.gb, [2, 0], [2, 2]);
    newShipHuman(players.human.gb, [9, 9], [9, 9]);

    // newShipAi(players.ai.gb, [5, 0], [5, 4]);
    newShipAi(players.ai.gb, [9, 9], [9, 9]);
    // newShipAi(players.ai.gb, [8, 0], [7, 0]);

    setUpAttackButtons();
  }

  function aiController() {
    let attackSuccesfull = false;

    while (!attackSuccesfull) {
      let index = Math.floor(
        Math.random() * players.human.gb.board.domElements.length,
      );
      let button = players.human.gb.board.domElements[index];
      let coords = [Number(button.id[0]), Number(button.id[2])];

      if (players.human.gb.receiveAttack(coords, "ai")) {
        attackSuccesfull = true;
        humanTurn = true;
      }
    }
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
        if (humanTurn) {
          let coords = [Number(button.id[0]), Number(button.id[2])];
          if (players.ai.gb.receiveAttack(coords, "human")) {
            humanTurn = false;
            aiController();
          }
        }
      });
    });
  }

  function setupButtons(buttons) {
    buttons.addEventListener("click", () => {
      Events.publish("boards:toggled");
      initialSetup();
    });
  }

  Events.subscribe("page:loaded", initialSetup);
  Events.subscribe("buttons:rendered", setupButtons);
})();
