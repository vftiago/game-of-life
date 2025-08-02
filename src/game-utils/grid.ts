import { CELL_NEIGHBOURS, DEFAULT_DENSITY } from "../constants";

export type PseudoGrid = Array<boolean>;

export type GridDimensions = {
  columnCount: number;
  rowCount: number;
};

export type CellPosition = {
  x: number;
  y: number;
};

export const createEmptyGrid = ({
  columnCount,
  rowCount,
}: GridDimensions): PseudoGrid => {
  return new Array(columnCount * rowCount).fill(false);
};

export const randomizeGrid = ({
  grid,
  density = DEFAULT_DENSITY,
}: {
  grid: PseudoGrid;
  density?: number;
}): PseudoGrid => {
  const length = grid.length;
  const result = new Array(length);

  for (let i = 0; i < length; i++) {
    result[i] = Math.random() < density;
  }

  return result;
};

export const getLiveNeighbourCount = ({
  cellPosition: { x, y },
  grid,
  gridDimensions: { columnCount, rowCount },
}: {
  cellPosition: CellPosition;
  grid: PseudoGrid;
  gridDimensions: GridDimensions;
}): number => {
  let count = 0;

  for (const { x: dx, y: dy } of CELL_NEIGHBOURS) {
    const nx = x + dx;
    const ny = y + dy;

    if (nx >= 0 && nx < columnCount && ny >= 0 && ny < rowCount) {
      const index = nx + ny * columnCount;

      if (grid[index]) {
        count++;
      }
    }
  }

  return count;
};

export const applyRules = ({
  grid,
  gridDimensions,
}: {
  grid: PseudoGrid;
  gridDimensions: GridDimensions;
}): PseudoGrid => {
  const { columnCount } = gridDimensions;
  const length = grid.length;
  const newGrid = new Array(length);

  for (let i = 0; i < length; i++) {
    const cellPosition = {
      x: i % columnCount,
      y: Math.floor(i / columnCount),
    };

    const isAlive = grid[i];

    const liveNeighbours = getLiveNeighbourCount({
      cellPosition,
      grid,
      gridDimensions,
    });

    if (isAlive) {
      newGrid[i] = liveNeighbours === 2 || liveNeighbours === 3;
    } else {
      newGrid[i] = liveNeighbours === 3;
    }
  }

  return newGrid;
};
