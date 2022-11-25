import { css } from "@emotion/css";
import GameControls from "./components/GameControls";
import GameGrid from "./components/GameGrid";
import useGame from "./game-hooks/useGame";

const Game = () => {
    const { grid, stepNumber, isRunning, setIsRunning, next, reset } =
        useGame();

    const handleOnClickPlayPause = () => {
        setIsRunning(!isRunning);
    };

    const handleClickNext = () => {
        next();
    };

    const handleClickReset = () => {
        reset();
    };

    return (
        <div className={containerStyles}>
            <h1>Game of Life</h1>
            <div className={stepNumberStyles}>
                Step Number:&nbsp;
                <span data-testid="step-number">{stepNumber}</span>
            </div>
            <GameControls
                isRunning={isRunning}
                onClickPlayPause={handleOnClickPlayPause}
                onClickNext={handleClickNext}
                onClickReset={handleClickReset}
            />
            <GameGrid grid={grid} />
        </div>
    );
};

// #region styles
const containerStyles = css`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(40, 44, 52);
    color: rgb(255, 255, 255);
    gap: 4px;
    h1 {
        font-family: "Quando";
        font-size: 2.4rem;
        text-shadow: 2px 2px 2px black;
        margin: 16px 0 0 0;
    }
`;

const stepNumberStyles = css`
    display: flex;
    font-family: monospace;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
`;
// #endregion styles

export default Game;
