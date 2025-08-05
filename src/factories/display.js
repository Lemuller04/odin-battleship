import Events from "./events.js";

const Display = (() => {
  function purge(container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  function displayBoard(players) {
    purge(document.querySelector(".middle"));
    const boardContainers = document.querySelectorAll(".board-container");
    let boardContainer = boardContainers[0];

    for (const key of Object.keys(players)) {
      purge(boardContainer);
      for (const div of players[key].gb.board.domElements) {
        boardContainer.appendChild(div);
      }
      boardContainer = boardContainers[1];
    }

    updateMiddle("Drag to place your ships");
  }

  function updateMessage([msg, from]) {
    const span = document.querySelector(".previous-message");
    const messageP = document.querySelector(".message");

    if (from === "human") {
      messageP.textContent = msg;
    } else if (from === "ai") {
      span.textContent = msg;
    } else {
      span.textContent = "";
      messageP.textContent = msg;
    }
  }

  function endGame(winner) {
    purge(document.querySelector(".middle"));
    toggleBoards();
    updateMiddle("Play again", "play-again");
  }

  function toggleBoards(owner) {
    let boards;

    if (owner) {
      if (owner === "human") {
        boards = Array.from(document.querySelectorAll(".cell")).slice(0, 100);
      } else {
        boards = Array.from(document.querySelectorAll(".cell")).slice(100, 200);
      }

      for (let board of boards) {
        board.classList.toggle("uninteractive");
      }
    } else {
      boards = document.querySelectorAll(".cell");

      for (let board of boards) {
        board.classList.toggle("inactive");
      }
    }
  }

  function updateMiddle(message, id) {
    purge(document.querySelector(".middle"));

    const middle = document.querySelector(".middle");
    const button = document.createElement("button");
    button.textContent = message;
    button.id = id;
    middle.appendChild(button);
    Events.publish("buttons:rendered", button);
  }

  Events.subscribe("ships:created", updateMiddle);
  Events.subscribe("boards:toggled", toggleBoards);
  Events.subscribe("game:ended", endGame);
  Events.subscribe("message:updated", updateMessage);
  Events.subscribe("players:created", displayBoard);
})();
