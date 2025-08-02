import { useCallback, useEffect, useRef, useState } from "react";
import { useBreakpoints } from "./useBreakpoints";
import { COLUMN_COUNT, ROW_COUNT } from "../constants";
import { createEmptyGrid, randomizeGrid } from "../game-utils";
import { PseudoGrid } from "../game-utils/grid";

export const useGridState = () => {
  const { height, width } = useBreakpoints();

  const [gridDimensions, setGridDimensions] = useState({
    columnCount: COLUMN_COUNT[width],
    rowCount: ROW_COUNT[height],
  });

  const initialGridRef = useRef<PseudoGrid | null>(null);

  const createInitialGrid = useCallback((dimensions: typeof gridDimensions) => {
    const newInitialGrid = randomizeGrid({
      grid: createEmptyGrid(dimensions),
    });

    initialGridRef.current = newInitialGrid;

    return newInitialGrid;
  }, []);

  const [grid, setGrid] = useState<PseudoGrid>(() =>
    createInitialGrid(gridDimensions),
  );

  const resetGrid = useCallback(() => {
    if (initialGridRef.current) {
      setGrid([...initialGridRef.current]);
    }
  }, []);

  useEffect(() => {
    const newDimensions = {
      columnCount: COLUMN_COUNT[width],
      rowCount: ROW_COUNT[height],
    };

    if (
      newDimensions.columnCount !== gridDimensions.columnCount ||
      newDimensions.rowCount !== gridDimensions.rowCount
    ) {
      setGridDimensions(newDimensions);
      const newInitialGrid = createInitialGrid(newDimensions);
      setGrid(newInitialGrid);
    }
  }, [width, height, gridDimensions, createInitialGrid]);

  return { gridDimensions, setGridDimensions, grid, setGrid, resetGrid };
};
