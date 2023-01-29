import { useCallback, useState } from "react";
import useInterval from "use-interval";
import {
    DEFAULT_COLUMN_COUNT,
    DEFAULT_INTERVAL,
    DEFAULT_ROW_COUNT,
} from "../game-utils/constants";
import {
    getNextGrid,
    getRandomizedGrid,
    GameGrid,
} from "../game-utils/game-utils";

const useGame = () => {
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [stepNumber, setStepNumber] = useState<number>(0);
    const [grid, setGrid] = useState<GameGrid>(
        getRandomizedGrid(DEFAULT_COLUMN_COUNT, DEFAULT_ROW_COUNT),
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
        setIsRunning,
        next,
        reset,
    };
};

export default useGame;
