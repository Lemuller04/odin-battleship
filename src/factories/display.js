import Events from "./events.js";

const Display = (() => {
  let previousMessage = "Place your ships";

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

  function updateMessage(msg) {
    const span = document.querySelector(".previous-message");
    const messageP = document.querySelector(".message");

    previousMessage = messageP.textContent;
    span.textContent = previousMessage;
    messageP.textContent = msg;
  }

  function endGame(winner) {
    purge(document.querySelector(".middle"));
    toggleBoards();
    updateMiddle("Play again", "play-again");
  }

  function toggleBoards() {
    const boards = document.querySelectorAll(".board-container");

    for (let board of boards) {
      board.classList.toggle("inactive");
    }
  }

  function updateMiddle(message, id = "") {
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
