import Gameboard from "../src/factories/gameboard.js";

describe("Gameboard factory's newShip function", () => {
  it("Creates a ship", () => {
    expect(Gameboard().newShip([0, 0], [0, 1])).toBeTruthy();
    expect(Gameboard().newShip([0, 0], [0, 4])).toBeTruthy();
    expect(Gameboard().newShip([0, 4], [0, 0])).toBeTruthy();
  });

  it("Creates a ship of size 1", () => {
    expect(Gameboard().newShip([0, 0], [0, 0])).toBeTruthy();
    expect(Gameboard().newShip([9, 9], [9, 9])).toBeTruthy();
  });

  it("Doesn't create invalid shaped ships", () => {
    expect(Gameboard().newShip([0, 0], [1, 1])).toBeFalsy();
    expect(Gameboard().newShip([9, 0], [8, 9])).toBeFalsy();
  });

  it("Doesn't create invalid size ships", () => {
    expect(Gameboard().newShip([0, 0], [0, 5])).toBeFalsy();
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

  it("Doesn't create overlapped ships", () => {
    let gb = Gameboard();
    gb.newShip([0, 0], [0, 4]);
    expect(gb.newShip([0, 0], [4, 0])).toBeFalsy();
    expect(gb.newShip([9, 4], [0, 4])).toBeFalsy();
    expect(gb.newShip([0, 0], [0, 0])).toBeFalsy();
  });

  it("Receives attacks on water", () => {
    let gb = Gameboard();
    gb.newShip([0, 0], [0, 0]);
    expect(gb.receiveAttack([0, 1])).toBeTruthy();
  });

  it("Receives attacks on ships", () => {
    let gb = Gameboard();
    gb.newShip([0, 0], [0, 0]);
    expect(gb.receiveAttack([0, 0])).toBeTruthy();
  });

  it("Doesn't attack already attacked cells", () => {
    let gb = Gameboard();
    gb.newShip([0, 0], [0, 0]);
    gb.receiveAttack([0, 0]);
    expect(gb.receiveAttack([0, 0])).toBeFalsy();
  });
});
