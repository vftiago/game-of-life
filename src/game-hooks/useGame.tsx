import { useCallback, useEffect, useState } from "react";
import useInterval from "use-interval";
import { getRandomizedGrid, Grid, updateGrid } from "../game-utils";
import { DEFAULT_INTERVAL } from "../game-utils/constants";

const useGame = () => {
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [stepNumber, setStepNumber] = useState<number>(0);
    const [grid, setGrid] = useState<Grid>([]);

    useEffect(() => {
        reset();
    }, []);

    useInterval(
        () => {
            nextStep();
        },
        isRunning ? DEFAULT_INTERVAL : null,
    );

    const reset = useCallback(() => {
        setIsRunning(false);
        setStepNumber(0);
        setGrid(getRandomizedGrid());
    }, []);

    const nextStep = useCallback(() => {
        setStepNumber(stepNumber + 1);
        setGrid(updateGrid(grid));
    }, [grid, stepNumber]);

    return {
        grid,
        isRunning,
        stepNumber,
        reset,
        setIsRunning,
        nextStep,
    };
};

export default useGame;
