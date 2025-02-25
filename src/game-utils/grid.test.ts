import {
  getGrid,
  getLiveNeighbourCount,
  getNextGrid,
  getRandomizedGrid,
} from "./grid";

describe("getGrid", () => {
  it("should generate a grid with specified dimensions filled with dead cells", () => {
    const COLUMN_COUNT = 3;
    const ROW_COUNT = 4;

    const grid = getGrid(COLUMN_COUNT, ROW_COUNT);

    expect(grid.length).toEqual(COLUMN_COUNT);
    expect(grid[0].length).toEqual(ROW_COUNT);
    expect(grid.flat().every((cell) => !cell)).toBe(true);
  });
});

describe("getRandomizedGrid", () => {
  it("should generate a grid with specified dimensions", () => {
    const COLUMN_COUNT = 5;
    const ROW_COUNT = 5;

    const randomizedGrid = getRandomizedGrid(COLUMN_COUNT, ROW_COUNT);

    expect(randomizedGrid.length).toEqual(COLUMN_COUNT);
    expect(randomizedGrid[0].length).toEqual(ROW_COUNT);
  });
});

describe("getLiveNeighbourCount", () => {
  it("should accurately count living neighbors", () => {
    const GRID = [
      [false, true, false],
      [false, true, false],
      [false, true, false],
    ];

    expect(getLiveNeighbourCount(GRID, 0, 0)).toEqual(2);
    expect(getLiveNeighbourCount(GRID, 0, 1)).toEqual(1);
    expect(getLiveNeighbourCount(GRID, 1, 1)).toEqual(2);
    expect(getLiveNeighbourCount(GRID, 2, 1)).toEqual(1);
    expect(getLiveNeighbourCount(GRID, 2, 2)).toEqual(2);
  });
});

describe("getNextGrid", () => {
  it("should correctly evolve a blinker pattern", () => {
    const INITIAL_GRID = [
      [false, false, false],
      [true, true, true],
      [false, false, false],
    ];

    const EXPECTED_GRID = [
      [false, true, false],
      [false, true, false],
      [false, true, false],
    ];

    const nextGrid = getNextGrid(INITIAL_GRID);

    expect(nextGrid).toEqual(EXPECTED_GRID);
  });

  it("should correctly evolve a glider pattern", () => {
    const INITIAL_GRID = [
      [false, true, false],
      [false, false, true],
      [true, true, true],
      [false, false, false],
      [false, false, false],
    ];

    const EXPECTED_GRID = [
      [false, false, false],
      [true, false, true],
      [false, true, true],
      [false, true, false],
      [false, false, false],
    ];

    const nextGrid = getNextGrid(INITIAL_GRID);

    expect(nextGrid).toEqual(EXPECTED_GRID);
  });

  it("should correctly evolve a toad pattern", () => {
    const INITIAL_GRID = [
      [false, false, false, false],
      [false, true, true, true],
      [true, true, true, false],
      [false, false, false, false],
    ];

    const EXPECTED_GRID = [
      [false, false, true, false],
      [true, false, false, true],
      [true, false, false, true],
      [false, true, false, false],
    ];

    const nextGrid = getNextGrid(INITIAL_GRID);
    expect(nextGrid).toEqual(EXPECTED_GRID);
  });
});
