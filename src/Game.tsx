import { css } from "@emotion/css";
import GameGrid from "./components/GameGrid";
import GameHeader from "./components/GameHeader";
import useGame from "./game-hooks/useGame";

function Game() {
    const { grid, stepNumber, isRunning, setIsRunning, next, reset } =
        useGame();

    const handleOnClickStartStop = () => {
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
            <GameHeader
                isRunning={isRunning}
                onClickStartStop={handleOnClickStartStop}
                onClickNext={handleClickNext}
                onClickReset={handleClickReset}
            />
            <span aria-label="Step Number" className={stepNumberStyles}>
                {stepNumber}
            </span>
            <GameGrid grid={grid} />
        </div>
    );
}

// #region styles
const containerStyles = css`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #282c34;
    color: white;
`;

const stepNumberStyles = css`
    font-family: "VT323", monospace;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    color: silver;
    height: 24px;
    width: 78px;
    font-size: 1.6rem;
    margin: 2px 0;
`;
// #endregion styles

export default Game;
