# Battleship Game – The Odin Project

This is a fully test-driven implementation of the classic **Battleship** game built as part of [The Odin Project](https://www.theodinproject.com/) JavaScript curriculum.

The goal of the project was to learn **Test-Driven Development (TDD)**, **modular architecture**, and **modern tooling** like Webpack and Jest—all while building a browser-based game with real game logic and interactivity.

---

## Features

- ✔️ Core game mechanics implemented (ship placement, attacks, turn-taking);
- ✔️ Fully tested logic using **Jest**;
- ✔️ Gameboard tracks hits, misses, and sunk ships;
- ✔️ Simple AI player that makes legal random moves;
- ✔️ DOM-rendered game UI with clickable cells;
- ✔️ Reset functionality with proper state cleanup;
- ✔️ Modular structure using ES Modules;
- ✔️ Built with **Webpack** (dev & production configs).

---

## Getting Started

### Prerequisites
Ensure Node.js and npm are installed on your system.

### Installation
```bash
git clone https://github.com/Lemuller04/odin-battleship.git
cd npm-template-odin
npm install
```

### Run tests
```bash
npm test
```

### Start Dvelopment Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

## What I Learned

- Writing testable, modular code from scratch;
- Using TDD to drive project structure and avoid overengineering;
- Managing game state and DOM interactions cleanly;
- Avoiding DOM-related bugs like event listener over-adding by properly resetting state.

## Future Improvements

- Smarter AI that follows up after a hit;
- 2-player mode with "pass the device" screen;
- Enhanced UI styling.
