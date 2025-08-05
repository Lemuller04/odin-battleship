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

    updateMiddle("Drag on your board<br>to place your ships", "hint");
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

    if (!message) return;

    const middle = document.querySelector(".middle");
    const button = document.createElement("button");
    button.innerHTML = message;
    button.id = id;
    middle.appendChild(button);
    Events.publish("buttons:rendered", button);
  }

  function updateShipCount([from, size]) {
    const list = from !== "human" ? "left" : "right";
    const ps = document.querySelectorAll(`.${list}>p`);

    for (const p of ps) {
      if (p.textContent.includes(size) && !p.classList.contains("sunk")) {
        p.classList.add("sunk");
        let text = p.textContent.split("");
        text.pop();
        text.push("0");
        p.textContent = text.join("");

        return;
      }
    }
  }

  function resetShipList(sizes) {
    while (sizes[0]) {
      let size = sizes.shift();
      helper(size, "left");
      helper(size, "right");
    }

    function helper(size, list) {
      const ps = document.querySelectorAll(`.${list}>p`);

      for (const p of ps) {
        if (p.textContent.includes(size) && p.classList.contains("sunk")) {
          p.classList.remove("sunk");
          let text = p.textContent.split("");
          text.pop();
          text.push(size);
          p.textContent = text.join("");
        }
      }
    }
  }

  Events.subscribe("shipList:reseted", resetShipList);
  Events.subscribe("ships:created", updateMiddle);
  Events.subscribe("boards:toggled", toggleBoards);
  Events.subscribe("game:ended", endGame);
  Events.subscribe("message:updated", updateMessage);
  Events.subscribe("players:created", displayBoard);
  Events.subscribe("ship:sunk", updateShipCount);
})();
