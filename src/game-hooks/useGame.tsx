import { useCallback, useEffect, useState } from "react";
import useInterval from "use-interval";
import { DEFAULT_INTERVAL } from "../game-utils/constants";
import { getNextGrid, getRandomizedGrid, Grid } from "../game-utils/game-utils";

const useGame = () => {
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [stepNumber, setStepNumber] = useState<number>(0);
    const [grid, setGrid] = useState<Grid>([]);

    useInterval(
        () => {
            next();
        },
        isRunning ? DEFAULT_INTERVAL : null,
    );

    const reset = useCallback(() => {
        setIsRunning(false);
        setStepNumber(0);
        setGrid(getRandomizedGrid());
    }, []);

    const next = useCallback(() => {
        setStepNumber(stepNumber + 1);
        setGrid(getNextGrid(grid));
    }, [grid, stepNumber]);

    useEffect(() => {
        reset();
    }, [reset]);

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
