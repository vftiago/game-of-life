import { css } from "@emotion/css";

type GameControlsProps = {
    isRunning: boolean;
    onClickPlayPause: () => void;
    onClickNext: () => void;
    onClickReset: () => void;
};

const GameControls = ({
    isRunning,
    onClickPlayPause,
    onClickNext,
    onClickReset,
}: GameControlsProps) => {
    return (
        <div className={buttonContainerStyles}>
            <button className={buttonStyles} onClick={onClickReset}>
                Reset
            </button>
            <button className={playButtonStyles} onClick={onClickPlayPause}>
                {isRunning ? "Pause" : "Play"}
            </button>
            <button className={buttonStyles} onClick={onClickNext}>
                Next
            </button>
        </div>
    );
};

export default GameControls;

// #region styles
const buttonContainerStyles = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    gap: 2rem;
`;

const buttonStyles = css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 5rem;
    height: 2rem;
    font-family: "VT323", monospace;
    font-size: 1.3rem;
    line-height: 0;
    color: white;
    text-shadow: -1px -1px rgb(0, 40, 40);
    background-color: rgb(80, 150, 150);
    box-shadow: 0 2px 0 rgba(0, 88, 88, 0.8);
    border: none;
    border-radius: 5%;
    cursor: pointer;
    &:active {
        position: relative;
        top: 2px;
        box-shadow: 0 0 0;
    }
`;

const playButtonStyles = css`
    ${buttonStyles}
    height: 5rem;
    border-radius: 50%;
`;
// #endregion styles
