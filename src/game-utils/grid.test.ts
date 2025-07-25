import { createEmptyGrid, getLiveNeighbourCount, applyRules } from "./grid";

describe("getGrid", () => {
  it("should generate a grid with specified dimensions filled with dead cells", () => {
    const COLUMN_COUNT = 3;
    const ROW_COUNT = 3;

    const grid = createEmptyGrid({
      columnCount: COLUMN_COUNT,
      rowCount: ROW_COUNT,
    });

    expect(grid.length).toEqual(COLUMN_COUNT * ROW_COUNT);
    expect(grid.every((cell) => !cell)).toBe(true);
  });
});

describe("getLiveNeighbourCount", () => {
  it("should accurately count living neighbors", () => {
    const GRID = [false, true, false, false, false, false, false, true, false];

    expect(
      getLiveNeighbourCount({
        grid: GRID,
        x: 0,
        y: 0,
        columnCount: 3,
        rowCount: 3,
      }),
    ).toEqual(1);

    expect(
      getLiveNeighbourCount({
        grid: GRID,
        x: 1,
        y: 1,
        columnCount: 3,
        rowCount: 3,
      }),
    ).toEqual(2);

    expect(
      getLiveNeighbourCount({
        grid: GRID,
        x: 2,
        y: 2,
        columnCount: 3,
        rowCount: 3,
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
    const INITIAL_GRID = [
      [false, false, false, false],
      [false, true, true, true],
      [false, false, false, false],
      [false, false, false, false],
    ].flat();

    const EXPECTED_GRID = [
      [false, false, true, false],
      [false, false, true, false],
      [false, false, true, false],
      [false, false, false, false],
    ].flat();

    const nextGrid = applyRules({
      grid: INITIAL_GRID,
      gridDimensions: GRID_DIMENSIONS,
    });

    expect(nextGrid).toEqual(EXPECTED_GRID);
  });

  it("should correctly evolve a glider pattern", () => {
    const INITIAL_GRID = [
      [false, true, false, false],
      [false, false, true, false],
      [true, true, true, false],
      [false, false, false, false],
    ].flat();

    const EXPECTED_GRID = [
      [false, false, false, false],
      [true, false, true, false],
      [false, true, true, false],
      [false, true, false, false],
    ].flat();

    const nextGrid = applyRules({
      grid: INITIAL_GRID,
      gridDimensions: GRID_DIMENSIONS,
    });

    expect(nextGrid).toEqual(EXPECTED_GRID);
  });

  it("should correctly evolve a toad pattern", () => {
    const INITIAL_GRID = [
      [false, false, false, false],
      [false, true, true, true],
      [true, true, true, false],
      [false, false, false, false],
    ].flat();

    const EXPECTED_GRID = [
      [false, false, true, false],
      [true, false, false, true],
      [true, false, false, true],
      [false, true, false, false],
    ].flat();

    const nextGrid = applyRules({
      grid: INITIAL_GRID,
      gridDimensions: GRID_DIMENSIONS,
    });

    expect(nextGrid).toEqual(EXPECTED_GRID);
  });
});
