# Game of Life built with React and Typescript

[Conway's Game of Life](https://en.m.wikipedia.org/wiki/Conway%27s_Game_of_Life), also known simply as Life, is a zero-player cellular automaton game.

At each step, the following transitions occur:

1. Any live cell with fewer than two live neighbors dies, as if by underpopulation.
2. Any live cell with two or three live neighbors lives on to the next generation.
3. Any live cell with more than three live neighbors dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

The rules are applied indefinitely, creating new board states at every step.

You can check it live on [https://gameoflife.vftiago.com/](https://gameoflife.vftiago.com/) or [https://gameoflife.infodump.xyz/](https://gameoflife.infodump.xyz/)

## Running the project locally

To run the project locally, clone it, install the project's dependencies with `pnpm i`, and then run it with `pnpm dev`. You should be able to see the game running on [http://localhost:5173](http://localhost:5173).
