import { useCallback, useEffect, useState } from "react";
import useInterval from "use-interval";
import {
  DEFAULT_INTERVAL,
  MAX_COLUMN_COUNT,
  MAX_ROW_COUNT,
} from "../constants";
import {
  getNextGrid,
  getRandomizedGrid,
  GameGridType,
} from "../game-utils/grid";
import { useBreakpoints } from "./useBreakpoints";

const useGame = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [stepNumber, setStepNumber] = useState<number>(0);
  const { height, width } = useBreakpoints();
  const [grid, setGrid] = useState<GameGridType>(
    getRandomizedGrid(MAX_COLUMN_COUNT[width], MAX_ROW_COUNT[height]),
  );

  const reset = useCallback(() => {
    setIsRunning(false);
    setStepNumber(0);
    setGrid(getRandomizedGrid(MAX_COLUMN_COUNT[width], MAX_ROW_COUNT[height]));
  }, [height, width]);

  useEffect(() => {
    window.addEventListener("resize", reset);
    return () => window.removeEventListener("resize", reset);
  }, [reset]);

  useInterval(
    () => {
      next();
    },
    isRunning ? DEFAULT_INTERVAL : null,
  );

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
