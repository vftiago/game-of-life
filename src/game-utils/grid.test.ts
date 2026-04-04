import { describe, expect, it } from "vitest";
import { applyRules, createEmptyGrid, getLiveNeighbourCount } from "./grid";

describe("getGrid", () => {
  it("should generate a grid with specified dimensions filled with dead cells", () => {
    const COLUMN_COUNT = 3;
    const ROW_COUNT = 3;

    const grid = createEmptyGrid({
      columnCount: COLUMN_COUNT,
      rowCount: ROW_COUNT,
    });

    expect(grid.length).toEqual(COLUMN_COUNT * ROW_COUNT);
    expect(grid.every((cell) => cell === 0)).toBe(true);
  });
});

describe("getLiveNeighbourCount", () => {
  it("should accurately count living neighbors", () => {
    const GRID = new Uint8Array([0, 1, 0, 0, 0, 0, 0, 1, 0]);

    expect(
      getLiveNeighbourCount({
        cellPosition: { x: 0, y: 0 },
        grid: GRID,
        gridDimensions: { columnCount: 3, rowCount: 3 },
      }),
    ).toEqual(1);

    expect(
      getLiveNeighbourCount({
        cellPosition: { x: 1, y: 1 },
        grid: GRID,
        gridDimensions: { columnCount: 3, rowCount: 3 },
      }),
    ).toEqual(2);

    expect(
      getLiveNeighbourCount({
        cellPosition: { x: 2, y: 2 },
        grid: GRID,
        gridDimensions: { columnCount: 3, rowCount: 3 },
      }),
    ).toEqual(1);
  });
});

describe("getNextGrid", () => {
  const GRID_DIMENSIONS = {
    columnCount: 4,
    rowCount: 4,
  };

  it("should correctly evolve a blinker pattern", () => {
    // prettier-ignore
    const INITIAL_GRID = new Uint8Array([
      0, 0, 0, 0,
      0, 1, 1, 1,
      0, 0, 0, 0,
      0, 0, 0, 0,
    ]);

    // prettier-ignore
    const EXPECTED_GRID = new Uint8Array([
      0, 0, 1, 0,
      0, 0, 1, 0,
      0, 0, 1, 0,
      0, 0, 0, 0,
    ]);

    const nextGrid = applyRules({
      grid: INITIAL_GRID,
      gridDimensions: GRID_DIMENSIONS,
    });

    expect(nextGrid).toEqual(EXPECTED_GRID);
  });

  it("should correctly evolve a glider pattern", () => {
    // prettier-ignore
    const INITIAL_GRID = new Uint8Array([
      0, 1, 0, 0,
      0, 0, 1, 0,
      1, 1, 1, 0,
      0, 0, 0, 0,
    ]);

    // prettier-ignore
    const EXPECTED_GRID = new Uint8Array([
      0, 0, 0, 0,
      1, 0, 1, 0,
      0, 1, 1, 0,
      0, 1, 0, 0,
    ]);

    const nextGrid = applyRules({
      grid: INITIAL_GRID,
      gridDimensions: GRID_DIMENSIONS,
    });

    expect(nextGrid).toEqual(EXPECTED_GRID);
  });

  it("should correctly evolve a toad pattern", () => {
    // prettier-ignore
    const INITIAL_GRID = new Uint8Array([
      0, 0, 0, 0,
      0, 1, 1, 1,
      1, 1, 1, 0,
      0, 0, 0, 0,
    ]);

    // prettier-ignore
    const EXPECTED_GRID = new Uint8Array([
      0, 0, 1, 0,
      1, 0, 0, 1,
      1, 0, 0, 1,
      0, 1, 0, 0,
    ]);

    const nextGrid = applyRules({
      grid: INITIAL_GRID,
      gridDimensions: GRID_DIMENSIONS,
    });

    expect(nextGrid).toEqual(EXPECTED_GRID);
  });
});
