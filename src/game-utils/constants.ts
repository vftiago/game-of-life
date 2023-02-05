export enum CellType {
    Square = "square",
    Dot = "dot",
}

export const DEFAULT_COLUMN_COUNT = 60;
export const DEFAULT_ROW_COUNT = 60;
export const DEFAULT_INTERVAL = 88;
export const DEFAULT_DENSITY = 0.15;
export const DEFAULT_CELL_SIZE = 10;
export const DEFAULT_CELL_TYPE = CellType.Square;
export const GRID_SIZE_OPTIONS = [40, 60, 80, 120];

export const DEFAULT_USER_SETTINGS = {
    columnCount: DEFAULT_COLUMN_COUNT,
    rowCount: DEFAULT_ROW_COUNT,
    cellType: DEFAULT_CELL_TYPE,
    isAlertVisible: true,
    showLogs: false,
};

export type UserSettings = typeof DEFAULT_USER_SETTINGS;
