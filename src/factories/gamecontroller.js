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
    humanTurn = true;

    setupHumanBoardButtons();
  }

  function continueSetup() {
    setupAiBoard();
    setUpAttackButtons();
    Events.publish("boards:toggled", "human");
  }

  function setupHumanBoardButtons() {
    const buttons = Array.from(document.querySelectorAll(".cell")).slice(
      0,
      100,
    );
    let path = [];
    let sizes = [5, 4, 3, 3, 2];
    let firstCoord = null;

    buttons.forEach((button) => {
      button.addEventListener("mousedown", () => {
        firstCoord = parseCoords(button.id);
      });

      button.addEventListener("mouseup", () => {
        if (!firstCoord) return;
        const secondCoord = parseCoords(button.id);
        const size = pathSize([firstCoord, secondCoord]);

        if (sizes.includes(size)) {
          players.human.gb.newShip(firstCoord, secondCoord, "ship");
          sizes.splice(sizes.indexOf(size), 1);
        }

        firstCoord = null; // reset after each attempt
        if (sizes.length < 1) {
          Events.publish("ships:created");
          continueSetup();
        }
      });
    });

    function parseCoords(id) {
      return id.split(",").map(Number);
    }
  }

  function pathSize(path) {
    let size = -1;
    if (path[0][0] === path[1][0]) {
      size = path[0][1] - path[1][1];
    } else if (path[0][1] === path[1][1]) {
      size = path[0][0] - path[1][0];
    } else {
      return size;
    }

    return Math.abs(size) + 1;
  }

  function setupAiBoard() {
    let sizes = [5, 4, 3, 3, 2];
    let shipCount = 0;

    while (shipCount < sizes.length) {
      const size = sizes[shipCount];
      let isHorizontal = Math.random() < 0.5;

      let y1 = Math.floor(Math.random() * 10);
      let x1 = Math.floor(Math.random() * 10);
      let y2 = y1;
      let x2 = x1;

      if (isHorizontal) {
        x2 = x1 + size - 1;
        if (x2 >= 10) {
          x1 = x1 - size + 1;
          x2 = x1 + size - 1;
        }
      } else {
        y2 = y1 + size - 1;
        if (y2 >= 10) {
          y1 = y1 - size + 1;
          y2 = y1 + size - 1;
        }
      }

      if (players.ai.gb.newShip([y1, x1], [y2, x2], "ai-ship")) {
        shipCount++;
      }
    }
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
        Events.publish("boards:toggled", "human");
      }
    }
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
            Events.publish("boards:toggled", "human");
            aiController();
          }
        }
      });
    });
  }

  function setupButtons(button) {
    button.addEventListener("click", () => {
      if (button.id === "play-again") {
        Events.publish("boards:toggled");
        Events.publish("message:updated", ["Place your ships", "controller"]);
        initialSetup();
        Events.publish("shipList:reseted", [5, 4, 3, 3, 2]);
      }
    });
  }

  Events.subscribe("page:loaded", initialSetup);
  Events.subscribe("buttons:rendered", setupButtons);
})();
