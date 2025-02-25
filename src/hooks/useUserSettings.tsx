import { useState } from "react";
import {
  CellType,
  DEFAULT_CELL_TYPE,
  MAX_COLUMN_COUNT,
  DEFAULT_INTERVAL,
  MAX_ROW_COUNT,
} from "../constants";
import { useBreakpoints } from "./useBreakpoints";

export const useUserSettings = () => {
  const { height, width } = useBreakpoints();
  const [columnCount, setColumnCount] = useState<number>(
    MAX_COLUMN_COUNT[width],
  );
  const [rowCount, setRowCount] = useState<number>(MAX_ROW_COUNT[height]);
  const [interval, setInterval] = useState<number>(DEFAULT_INTERVAL);
  const [cellType, setCellType] = useState<CellType>(DEFAULT_CELL_TYPE);
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(true);
  const [showLogs, setShowLogs] = useState<boolean>(false);

  return {
    isAlertVisible,
    columnCount,
    rowCount,
    interval,
    cellType,
    showLogs,
    setIsAlertVisible,
    setColumnCount,
    setRowCount,
    setInterval,
    setCellType,
    setShowLogs,
  };
};
