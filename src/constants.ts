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
  lg: 75,
  md: 60,
  sm: 45,
  xl: 90,
  xs: 30,
  xxs: 20,
};

export const ROW_COUNT = {
  lg: 60,
  md: 40,
  sm: 25,
  xl: 80,
  xs: 10,
  xxs: 5,
};

export const DEFAULT_INTERVAL = 20;
export const DEFAULT_DENSITY = 0.15;
export const DEFAULT_CELL_TYPE = "square";
