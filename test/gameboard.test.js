import Gameboard from "../src/factories/gameboard.js";

describe("Gameboard factory", () => {
  it("Creates a ship", () => {
    expect(Gameboard().newShip([0, 0], [0, 1])).toBeTruthy();
  });
});
