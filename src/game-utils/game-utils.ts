import {
    DEFAULT_COLUMN_COUNT,
    DEFAULT_DENSITY,
    DEFAULT_ROW_COUNT,
} from "./constants";

export type Grid = boolean[][];

const getFilledArray = (length: number) => {
    return new Array(length).fill(false);
};

export const getGrid = (
    columnCount: number = DEFAULT_COLUMN_COUNT,
    rowCount: number = DEFAULT_ROW_COUNT,
): Grid => {
    return getFilledArray(columnCount).map(() => getFilledArray(rowCount));
};

export const getRandomizedGrid = (
    columnCount: number = DEFAULT_COLUMN_COUNT,
    rowCount: number = DEFAULT_ROW_COUNT,
): Grid => {
    const grid = getGrid(columnCount, rowCount);
    const randomizedGrid = grid.map((column) =>
        column.map(() => Math.random() < DEFAULT_DENSITY),
    );

    // make the initial state slightly more interesting
    return getNextGrid(randomizedGrid);
};

export const getLiveNeighbourCount = (
    grid: Grid,
    columnIndex: number,
    rowIndex: number,
): number => {
    let liveNeighboutCount = 0;

    if (grid[columnIndex][rowIndex - 1]) {
        liveNeighboutCount += 1;
    }
    if (grid[columnIndex][rowIndex + 1]) {
        liveNeighboutCount += 1;
    }
    if (grid[columnIndex + 1]?.[rowIndex]) {
        liveNeighboutCount += 1;
    }
    if (grid[columnIndex + 1]?.[rowIndex - 1]) {
        liveNeighboutCount += 1;
    }
    if (grid[columnIndex + 1]?.[rowIndex + 1]) {
        liveNeighboutCount += 1;
    }
    if (grid[columnIndex - 1]?.[rowIndex]) {
        liveNeighboutCount += 1;
    }
    if (grid[columnIndex - 1]?.[rowIndex - 1]) {
        liveNeighboutCount += 1;
    }
    if (grid[columnIndex - 1]?.[rowIndex + 1]) {
        liveNeighboutCount += 1;
    }

    return liveNeighboutCount;
};

export const getNextGrid = (grid: Grid): Grid => {
    const newGrid = getGrid(grid.length, grid[0].length);

    grid.forEach((column, columnIndex) => {
        column.forEach((alive, rowIndex) => {
            const liveNeighbourCount = getLiveNeighbourCount(
                grid,
                columnIndex,
                rowIndex,
            );

            if (alive) {
                if (liveNeighbourCount === 2 || liveNeighbourCount === 3) {
                    newGrid[columnIndex][rowIndex] = true;
                }
            } else {
                if (liveNeighbourCount === 3) {
                    newGrid[columnIndex][rowIndex] = true;
                }
            }
        });
    });

    return newGrid;
};
