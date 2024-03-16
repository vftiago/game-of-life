export enum CellType {
  Square = "square",
  Dot = "dot",
}

export const INITIAL_COLUMN_COUNT = {
  xxs: 20,
  xs: 30,
  sm: 40,
  md: 50,
  lg: 60,
  xl: 80,
  xxl: 100,
};

export const INITIAL_ROW_COUNT = {
  xxs: 15,
  xs: 20,
  sm: 30,
  md: 40,
  lg: 60,
  xl: 80,
  xxl: 100,
};

export const DEFAULT_COLUMN_COUNT = INITIAL_COLUMN_COUNT.lg;
export const DEFAULT_ROW_COUNT = INITIAL_ROW_COUNT.md;
export const DEFAULT_INTERVAL = 88;
export const DEFAULT_DENSITY = 0.15;
export const DEFAULT_CELL_SIZE = 10;
export const DEFAULT_CELL_TYPE = CellType.Square;
export const GRID_SIZE_OPTIONS = [30, 40, 60, 80, 120];
