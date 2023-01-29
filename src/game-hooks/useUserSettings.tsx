import { useState } from "react";
import {
    CellType,
    DEFAULT_CELL_TYPE,
    DEFAULT_COLUMN_COUNT,
    DEFAULT_INTERVAL,
    DEFAULT_ROW_COUNT,
} from "../game-utils/constants";

const useUserSettings = () => {
    const [columnCount, setColumnCount] =
        useState<number>(DEFAULT_COLUMN_COUNT);
    const [rowCount, setRowCount] = useState<number>(DEFAULT_ROW_COUNT);
    const [interval, setInterval] = useState<number>(DEFAULT_INTERVAL);
    const [cellType, setCellType] = useState<CellType>(DEFAULT_CELL_TYPE);

    return {
        columnCount,
        rowCount,
        interval,
        cellType,
        setColumnCount,
        setRowCount,
        setInterval,
        setCellType,
    };
};

export default useUserSettings;
