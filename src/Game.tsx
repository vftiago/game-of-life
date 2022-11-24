import { css } from "@emotion/css";
import { FpsView } from "react-fps";
import GameGrid from "./components/Grid";
import { Header } from "./components/Header";
import useGame from "./game-hooks/useGame";

function Game() {
    const { grid, stepNumber, reset, isRunning, setIsRunning, nextStep } =
        useGame();

    const handleOnClickStartStop = () => {
        setIsRunning(!isRunning);
    };

    const handleClickNext = () => {
        nextStep();
    };

    const handleClickReset = () => {
        reset();
    };

    return (
        <div className={gameOfLifeContainerStyles}>
            <FpsView />
            <Header
                isRunning={isRunning}
                onClickStartStop={handleOnClickStartStop}
                onClickNext={handleClickNext}
                onClickReset={handleClickReset}
            />
            <span>{stepNumber}</span>
            <GameGrid grid={grid} />
        </div>
    );
}

const gameOfLifeContainerStyles = css`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export default Game;
