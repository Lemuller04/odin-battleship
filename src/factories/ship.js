const Ship = (size) => {
  let hits = 0;
  let sunk = false;

  return {
    hit: () => hits++,
    isSunk: () => hits === size,
  };
};

export default Ship;
