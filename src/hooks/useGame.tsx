import { useCallback, useState } from "react";
import useInterval from "use-interval";
import {
  DEFAULT_INTERVAL,
  INITIAL_COLUMN_COUNT,
  INITIAL_ROW_COUNT,
} from "../utils/constants";
import { getNextGrid, getRandomizedGrid, GameGrid } from "../utils/game-utils";
import { useBreakpoints } from "./useBreakpoints";

const useGame = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [stepNumber, setStepNumber] = useState<number>(0);
  const { height, width } = useBreakpoints();
  const [grid, setGrid] = useState<GameGrid>(
    getRandomizedGrid(INITIAL_COLUMN_COUNT[width], INITIAL_ROW_COUNT[height]),
  );

  useInterval(
    () => {
      next();
    },
    isRunning ? DEFAULT_INTERVAL : null,
  );

  const reset = useCallback((columnCount: number, rowCount: number) => {
    setIsRunning(false);
    setStepNumber(0);
    setGrid(getRandomizedGrid(columnCount, rowCount));
  }, []);

  const next = useCallback(() => {
    setStepNumber(stepNumber + 1);
    setGrid(getNextGrid(grid));
  }, [grid, stepNumber]);

  return {
    grid,
    stepNumber,
    isRunning,
    setGrid,
    setIsRunning,
    next,
    reset,
  };
};

export default useGame;
