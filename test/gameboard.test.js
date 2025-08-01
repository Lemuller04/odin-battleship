import Gameboard from "../src/factories/gameboard.js";

describe("Gameboard factory's newShip function", () => {
  it("Creates a ship", () => {
    expect(Gameboard().newShip([0, 0], [0, 1])).toBeTruthy();
    expect(Gameboard().newShip([0, 0], [0, 9])).toBeTruthy();
    expect(Gameboard().newShip([0, 9], [0, 0])).toBeTruthy();
    expect(Gameboard().newShip([0, 0], [0, 0])).toBeTruthy();
    expect(Gameboard().newShip([9, 9], [9, 9])).toBeTruthy();
  });

  it("Doesn't create invalid shaped ships", () => {
    expect(Gameboard().newShip([0, 0], [1, 1])).toBeFalsy();
    expect(Gameboard().newShip([9, 0], [8, 9])).toBeFalsy();
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
    expect(Gameboard().newShip([-1, -1], [-1, -1])).toBeFalsy();
  });

  it("Doens't create ovelapped ships", () => {
    let gb = Gameboard();
    gb.newShip([0, 0], [0, 4]);
    expect(gb.newShip([0, 0], [4, 0])).toBeFalsy();
    expect(gb.newShip([9, 4], [0, 4])).toBeFalsy();
  });
});
