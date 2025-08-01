import Gameboard from "../src/factories/gameboard.js";

describe("Gameboard factory", () => {
  it("Creates a ship", () => {
    expect(Gameboard().newShip([0, 0], [0, 1])).toBeTruthy();
  });

  it("Doesn't create invalid shaped ships", () => {
    expect(Gameboard().newShip([0, 0], [1, 1])).toBeFalsy();
  });

  it("Doesn't create out of bounds ships", () => {
    expect(Gameboard().newShip([0, 0], [0, 10])).toBeFalsy();
    expect(Gameboard().newShip([0, 0], [10, 0])).toBeFalsy();
    expect(Gameboard().newShip([0, 0], [0, -1])).toBeFalsy();
    expect(Gameboard().newShip([0, 0], [-1, 0])).toBeFalsy();
    expect(Gameboard().newShip([10, 0], [0, 0])).toBeFalsy();
    expect(Gameboard().newShip([0, 10], [0, 0])).toBeFalsy();
    expect(Gameboard().newShip([-1, 0], [0, 0])).toBeFalsy();
    expect(Gameboard().newShip([0, -1], [0, 0])).toBeFalsy();
  });
});
