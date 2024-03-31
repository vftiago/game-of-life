# Game of Life built with React and Typescript

[Conway's Game of Life](https://en.m.wikipedia.org/wiki/Conway%27s_Game_of_Life), also known simply as Life, is a zero-player cellular automaton game.

At each step, the following transitions occur:

1. Any live cell with fewer than two live neighbors dies, as if by underpopulation.
2. Any live cell with two or three live neighbors lives on to the next generation.
3. Any live cell with more than three live neighbors dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

The rules are applied indefinitely, creating new board states at every step or tick.

You can check it live on [https://gameoflife.vftiago.com/](https://gameoflife.vftiago.com/) or [https://gameoflife.infodump.xyz/](https://gameoflife.infodump.xyz/)

## Running the project locally

To run the project, clone it, run `npm i`, and then run `npm start`. You should be able to see the game running on [http://localhost:5174](http://localhost:5174).

## Potential points of improvement

The following features could potentially increase the app's usability at little development cost (quick wins), in no particular order:

- [x] Dynamically set up the initial board dimensions based on the browser window's inner height and width.
- [x] Allow users to click each individual `Cell` to change its state to `dead` or `alive` when the game is paused.
  - [ ] As a follow-up, allow users to clear the board (set all cells to `dead`).
- [ ] Allow users to change the time interval between ticks up to a sensible limit.
- [ ] Allow users to change cell size up to a sensible limit.
