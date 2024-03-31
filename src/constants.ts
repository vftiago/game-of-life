export enum CellType {
  Square = "square",
  Dot = "dot",
}

export const MAX_COLUMN_COUNT = {
  xxs: 20,
  xs: 30,
  sm: 45,
  md: 60,
  lg: 70,
  xl: 80,
  xxl: 100,
};

export const MAX_ROW_COUNT = {
  xxs: 10,
  xs: 20,
  sm: 30,
  md: 45,
  lg: 70,
  xl: 80,
  xxl: 100,
};

export const DEFAULT_COLUMN_COUNT = MAX_COLUMN_COUNT.lg;
export const DEFAULT_ROW_COUNT = MAX_ROW_COUNT.md;
export const DEFAULT_INTERVAL = 88;
export const DEFAULT_DENSITY = 0.15;
export const DEFAULT_CELL_SIZE = 9;
export const DEFAULT_CELL_TYPE = CellType.Square;
