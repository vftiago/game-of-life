import {
    getGrid,
    getLiveNeighbourCount,
    getNextGrid,
    getRandomizedGrid,
} from "./game-utils";

import { DEFAULT_COLUMN_COUNT, DEFAULT_ROW_COUNT } from "./constants";

describe("getGrid", () => {
    it("should generate a bi-dimensional array with the default dimensions, filled with dead (false) cells", () => {
        const grid = getGrid();

        expect(grid.length).toEqual(DEFAULT_COLUMN_COUNT);
        for (let i = 0; i < grid.length; i++) {
            expect(grid[i].length).toEqual(DEFAULT_ROW_COUNT);
            expect(grid[i].every((cell) => !cell)).toBe(true);
        }
    });

    it("should generate a bi-dimensional array with the given dimensions, filled with dead (false) cells", () => {
        const grid = getGrid(1, 1);

        expect(grid.length).toEqual(1);
        for (let i = 0; i < grid.length; i++) {
            expect(grid[i].length).toEqual(1);
            expect(grid[i].every((cell) => !cell)).toBe(true);
        }
    });
});

describe("getRandomizedGrid", () => {
    it("should generate a bi-dimensional array with the default dimensions, in which some cells should be alive (true)", () => {
        const randomizedGrid = getRandomizedGrid();

        expect(randomizedGrid.length).toEqual(DEFAULT_COLUMN_COUNT);
        for (let i = 0; i < randomizedGrid.length; i++) {
            expect(randomizedGrid[i].length).toEqual(DEFAULT_ROW_COUNT);
        }
    });
});

describe("getLiveNeighbourCount", () => {
    it("should accurately count the number of living neighbouring cells", () => {
        const grid = getGrid();

        expect(getLiveNeighbourCount(grid, 2, 2)).toEqual(0);

        // manually set up a hollow square of living cells, plus a single lonely cell on the opposite corner for testing purposes
        grid[1][1] = true;
        grid[1][2] = true;
        grid[1][3] = true;
        grid[2][1] = true;
        grid[2][3] = true;
        grid[3][1] = true;
        grid[3][2] = true;
        grid[3][3] = true;
        grid[49][49] = true;

        expect(getLiveNeighbourCount(grid, 0, 0)).toEqual(1);
        expect(getLiveNeighbourCount(grid, 0, 1)).toEqual(2);
        expect(getLiveNeighbourCount(grid, 0, 2)).toEqual(3);
        expect(getLiveNeighbourCount(grid, 1, 2)).toEqual(4);
        expect(getLiveNeighbourCount(grid, 2, 2)).toEqual(8);
        expect(getLiveNeighbourCount(grid, 48, 48)).toEqual(1);
        expect(getLiveNeighbourCount(grid, 49, 49)).toEqual(0);
    });
});

describe("getNextGrid", () => {
    it("should generate a new grid with the same dimensions as the current grid and an updated state", () => {
        const grid = getGrid(3, 3);

        grid[1][0] = true;
        grid[1][1] = true;
        grid[1][2] = true;

        const nextGrid = getNextGrid(grid);

        expect(nextGrid.length).toEqual(grid.length);

        for (let i = 0; i < nextGrid.length; i++) {
            expect(nextGrid[i].length).toEqual(grid[i].length);
        }

        expect(nextGrid[0][1]).toBe(true);
        expect(nextGrid[1][1]).toBe(true);
        expect(nextGrid[2][1]).toBe(true);
    });
});
