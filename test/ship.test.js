import Ship from "../src/factories/ship.js";

describe("Ship factory methods", () => {
  it("New ship isn't sunk", () => {
    expect(Ship(2).isSunk()).toBeFalsy();
  });

  it("New ship of size two takes one hit", () => {
    let ship = Ship(2);
    ship.hit();
    expect(ship.isSunk()).toBeFalsy();
  });

  it("New ship of size two sunks after two hits", () => {
    let ship = Ship(2);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBeTruthy();
  });

  it("Tracks number of hits accurately", () => {
    let ship = Ship(3);
    ship.hit();
    ship.hit();
    expect(ship.getHits()).toBe(2);
  });

  it("Does not exceed max hits", () => {
    let ship = Ship(1);
    ship.hit();
    ship.hit();
    expect(ship.getHits()).toBe(1);
  });
});
