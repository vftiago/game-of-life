import { useCallback, useState } from "react";
import { COLUMN_COUNT, ROW_COUNT } from "../constants";
import { PseudoGrid, createEmptyGrid, randomizeGrid } from "../game-utils/grid";
import { useBreakpoints } from "./useBreakpoints";

type GridData = {
  grid: PseudoGrid;
  initialGrid: PseudoGrid;
};

const buildInitialGrid = (columnCount: number, rowCount: number) => {
  const grid = randomizeGrid({ grid: createEmptyGrid({ columnCount, rowCount }) });
  return { grid, initialGrid: grid };
};

export const useGridState = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [stepNumber, setStepNumber] = useState(0);

  const { height, width } = useBreakpoints();
  const columnCount = COLUMN_COUNT[width];
  const rowCount = ROW_COUNT[height];

  const [gridData, setGridData] = useState<GridData>(() => buildInitialGrid(columnCount, rowCount));
  const [prevDimensions, setPrevDimensions] = useState({ columnCount, rowCount });

  if (columnCount !== prevDimensions.columnCount || rowCount !== prevDimensions.rowCount) {
    setPrevDimensions({ columnCount, rowCount });
    setGridData(buildInitialGrid(columnCount, rowCount));
    setStepNumber(0);
    setIsRunning(false);
  }

  const setGrid = useCallback((gridOrUpdater: PseudoGrid | ((prev: PseudoGrid) => PseudoGrid)) => {
    setGridData((prev) => ({
      ...prev,
      grid: typeof gridOrUpdater === "function" ? gridOrUpdater(prev.grid) : gridOrUpdater,
    }));
  }, []);

  const resetGrid = useCallback(() => {
    setStepNumber(0);
    setIsRunning(false);
    setGridData((prev) => ({
      ...prev,
      grid: prev.initialGrid.slice(),
    }));
  }, []);

  return {
    columnCount,
    grid: gridData.grid,
    isRunning,
    resetGrid,
    rowCount,
    setGrid,
    setIsRunning,
    setStepNumber,
    stepNumber,
  };
};
