# Game of Life built with React and Typescript

[Conway's Game of Life](https://en.m.wikipedia.org/wiki/Conway%27s_Game_of_Life), also known simply as Life, is a zero-player cellular automaton game.

At each step, the following transitions occur:

1. Any live cell with fewer than two live neighbors dies, as if by underpopulation.
2. Any live cell with two or three live neighbors lives on to the next generation.
3. Any live cell with more than three live neighbors dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

The rules are applied indefinitely, creating new board states at every step or tick.

You can check it live here: [https://game-of-life.vftiago.com/](https://game-of-life.vftiago.com/)

## Run the project locally

To run the project, clone it, run `npm i`, and then run `npm start`. You should be able to see the game running on [http://localhost:5174](http://localhost:5174).

## Available Scripts

In the project directory, you can run:

### `npm prepare`

Installs [husky](https://typicode.github.io/husky/#/) to enable running [lint-staged](https://github.com/okonet/lint-staged) on a pre-commit hook. You do not need to run this yourself: see [npm script lifecycle](https://typicode.github.io/husky/#/) for more information. Useful to run [prettier](https://prettier.io/), [eslint](https://eslint.org/), and related [jest](https://jestjs.io/) tests before any commit.

### `npm start`

Runs the app in the development mode.
Open [http://localhost:5174](http://localhost:5174) to view it in the browser.

The page will reload if you make edits.

### `npm run build`

Builds the app for production to the `dist` folder.

### `npm format`

Formats code using [prettier](https://prettier.io/).

### `npm lint`

Checks code for linter problems using [eslint](https://eslint.org/).

### `npm test`

Runs tests with [jest](https://jestjs.io/).

### `npm test:staged`

Runs tests related to staged files.

## Potential points of improvement

The following features could potentially increase the app's usability at little development cost (quick wins), in no particular order:

-   [x] Allow users to set up an initial board state by clicking each individual `Cell` to change its state to `dead` or `alive`.
    -   [ ] As a follow-up, allow users to clear the board as well (set all cells to `dead`).
-   [ ] Allow users to change the time between ticks up to a sensible limit.
-   [ ] Allow users to change cell size up to a sensible limit.
-   [ ] Dynamically set up the initial board dimensions (column and row size) based on window height and width to avoid overflow.
