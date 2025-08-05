const Ship = (size) => {
  let hits = 0;

  return {
    hit: () => {
      if (hits !== size) hits++;
    },
    isSunk: () => hits === size,
    getHits: () => hits,
    getSize: () => size,
  };
};

export default Ship;
