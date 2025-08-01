export const CELL_NEIGHBOURS = [
  { x: -1, y: -1 },
  { x: 0, y: -1 },
  { x: 1, y: -1 },
  { x: -1, y: 0 },
  { x: 1, y: 0 },
  { x: -1, y: 1 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
];

export enum ScreenSize {
  XXS = "xxs",
  XS = "xs",
  SM = "sm",
  MD = "md",
  LG = "lg",
  XL = "xl",
}

export const COLUMN_COUNT = {
  xxs: 20,
  xs: 30,
  sm: 45,
  md: 60,
  lg: 75,
  xl: 90,
};

export const ROW_COUNT = {
  xxs: 5,
  xs: 10,
  sm: 25,
  md: 40,
  lg: 60,
  xl: 80,
};

export const DEFAULT_INTERVAL = 20;
export const DEFAULT_DENSITY = 0.15;
export const DEFAULT_CELL_TYPE = "square";
