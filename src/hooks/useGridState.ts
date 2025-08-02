import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useBreakpoints } from "./useBreakpoints";
import { COLUMN_COUNT, ROW_COUNT } from "../constants";
import { createEmptyGrid, randomizeGrid } from "../game-utils";
import { PseudoGrid } from "../game-utils/grid";

type GridState = {
  gridDimensions: {
    columnCount: number;
    rowCount: number;
  };
  grid: PseudoGrid;
};

export const useGridState = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [stepNumber, setStepNumber] = useState<number>(0);

  const { height, width } = useBreakpoints();

  const initialGridRef = useRef<PseudoGrid | null>(null);

  const createInitialGrid = useCallback(
    (dimensions: GridState["gridDimensions"]) => {
      const newInitialGrid = randomizeGrid({
        grid: createEmptyGrid(dimensions),
      });

      initialGridRef.current = newInitialGrid;
      return newInitialGrid;
    },
    [],
  );

  const [gridState, setGridState] = useState<GridState>(() => {
    const initialDimensions = {
      columnCount: COLUMN_COUNT[width],
      rowCount: ROW_COUNT[height],
    };

    return {
      gridDimensions: initialDimensions,
      grid: createInitialGrid(initialDimensions),
    };
  });

  const setGrid = useCallback(
    (gridOrUpdater: PseudoGrid | ((prev: PseudoGrid) => PseudoGrid)) => {
      setGridState((prevState) => ({
        ...prevState,
        grid:
          typeof gridOrUpdater === "function"
            ? gridOrUpdater(prevState.grid)
            : gridOrUpdater,
      }));
    },
    [],
  );

  const resetGrid = useCallback(() => {
    if (initialGridRef.current) {
      setStepNumber(0);
      setIsRunning(false);
      setGridState((prevState) => ({
        ...prevState,
        grid: [...initialGridRef.current!],
      }));
    }
  }, []);

  useLayoutEffect(() => {
    const newDimensions = {
      columnCount: COLUMN_COUNT[width],
      rowCount: ROW_COUNT[height],
    };

    if (
      newDimensions.columnCount !== gridState.gridDimensions.columnCount ||
      newDimensions.rowCount !== gridState.gridDimensions.rowCount
    ) {
      const newInitialGrid = createInitialGrid(newDimensions);

      setStepNumber(0);
      setIsRunning(false);
      setGridState({
        gridDimensions: newDimensions,
        grid: newInitialGrid,
      });
    }
  }, [width, height, gridState.gridDimensions, createInitialGrid]);

  return {
    isRunning,
    setIsRunning,
    stepNumber,
    setStepNumber,
    grid: gridState.grid,
    gridDimensions: gridState.gridDimensions,
    setGrid,
    resetGrid,
  };
};
