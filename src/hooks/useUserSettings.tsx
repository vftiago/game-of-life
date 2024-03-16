import { useState } from "react";
import {
  CellType,
  DEFAULT_CELL_TYPE,
  INITIAL_COLUMN_COUNT,
  DEFAULT_INTERVAL,
  DEFAULT_ROW_COUNT,
} from "../utils/constants";
import { useBreakpoints } from "./useBreakpoints";

const useUserSettings = () => {
  const screenSize = useBreakpoints();
  const [columnCount, setColumnCount] = useState<number>(
    INITIAL_COLUMN_COUNT[screenSize],
  );
  const [rowCount, setRowCount] = useState<number>(DEFAULT_ROW_COUNT);
  const [interval, setInterval] = useState<number>(DEFAULT_INTERVAL);
  const [cellType, setCellType] = useState<CellType>(DEFAULT_CELL_TYPE);
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(true);
  const [showLogs, setShowLogs] = useState<boolean>(false);

  return {
    columnCount,
    rowCount,
    interval,
    cellType,
    isAlertVisible,
    showLogs,
    setColumnCount,
    setRowCount,
    setInterval,
    setCellType,
    setIsAlertVisible,
    setShowLogs,
  };
};

export default useUserSettings;
