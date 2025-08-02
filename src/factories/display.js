import Events from "./events.js";

const Display = (() => {
  function displayBoard(players) {
    const boardContainers = document.querySelectorAll(".board-container");
    let boardContainer = boardContainers[0];

    for (const key of Object.keys(players)) {
      for (const div of players[key].gb.board.domElements) {
        boardContainer.appendChild(div);
      }
      boardContainer = boardContainers[1];
    }
  }

  Events.subscribe("players:created", displayBoard);
})();
