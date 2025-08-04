const Ship = (size) => {
  let hits = 0;

  return {
    hit: () => {
      if (hits !== size) hits++;
    },
    isSunk: () => hits === size,
    getHits: () => hits,
  };
};

export default Ship;
