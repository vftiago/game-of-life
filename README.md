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

To run the project, clone it, run `npm install`, and then run `npm start`. You should be able to see the game running on [http://localhost:3000](http://localhost:3000). For more information check out the [available scripts](#available-scripts) below.

## Available Scripts

In the project directory, you can run:

### `npm prepare`

Installs [husky](https://typicode.github.io/husky/#/) to enable running [lint-staged](https://github.com/okonet/lint-staged) on a pre-commit hook. You do not need to run this yourself. see [npm script lifecycle](https://typicode.github.io/husky/#/) for more information. Useful to run [prettier](https://prettier.io/), [eslint](https://eslint.org/), and tests before any commit.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm format`

Formats code using [prettier](https://prettier.io/).

### `npm lint`

Checks code for linter problems using [eslint](https://eslint.org/).

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm test:nowatch`

Runs tests related to staged files with `watchAll` turned off.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Potential points of improvement

The following features could potentially increase the app's usability at little development cost (quick wins), in no particular order:

-   Allow users to set up an initial board state by clicking each individual `Cell` to change its state to `dead` or `alive`.
    -   As a follow-up, allow users to clear the board as well (set all cells to `dead`).
-   Allow users to change the time between ticks up to a sensible limit.
-   Allow users to change cell size up to a sensible limit.
-   Dynamically set up the initial board dimensions (column and row size) based on window height and width to avoid overflow.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
