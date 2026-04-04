import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { COLUMN_COUNT, ROW_COUNT } from "../constants";
import { createEmptyGrid, randomizeGrid } from "../game-utils";
import { PseudoGrid } from "../game-utils/grid";
import { useBreakpoints } from "./useBreakpoints";

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

  //eslint-disable-next-line react-hooks/refs
  const [gridState, setGridState] = useState<GridState>(() => {
    const initialDimensions = {
      columnCount: COLUMN_COUNT[width],
      rowCount: ROW_COUNT[height],
    };

    return {
      grid: createInitialGrid(initialDimensions),
      gridDimensions: initialDimensions,
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
        grid: newInitialGrid,
        gridDimensions: newDimensions,
      });
    }
  }, [width, height, gridState.gridDimensions, createInitialGrid]);

  return {
    grid: gridState.grid,
    gridDimensions: gridState.gridDimensions,
    isRunning,
    resetGrid,
    setGrid,
    setIsRunning,
    setStepNumber,
    stepNumber,
  };
};
