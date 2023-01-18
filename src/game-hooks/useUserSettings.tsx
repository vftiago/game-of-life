import { useState } from "react";
import {
    DEFAULT_COLUMN_COUNT,
    DEFAULT_INTERVAL,
    DEFAULT_ROW_COUNT,
} from "../game-utils/constants";

const useUserSettings = () => {
    const [columnCount, setColumnCount] =
        useState<number>(DEFAULT_COLUMN_COUNT);
    const [rowCount, setRowCount] = useState<number>(DEFAULT_ROW_COUNT);
    const [interval, setInterval] = useState<number>(DEFAULT_INTERVAL);

    return {
        columnCount,
        rowCount,
        interval,
        setColumnCount,
        setRowCount,
        setInterval,
    };
};

export default useUserSettings;
