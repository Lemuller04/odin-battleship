import Events from "./events.js";

const GameController = (() => {
  function initialSetup() {
    console.log("asjd");
  }

  Events.subscribe("page:loaded", initialSetup);
})();
