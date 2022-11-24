import { css } from "@emotion/css";

type HeaderProps = {
    isRunning: boolean;
    onClickStartStop: () => void;
    onClickNext: () => void;
    onClickReset: () => void;
};

const GameHeader = ({
    isRunning,
    onClickStartStop,
    onClickNext,
    onClickReset,
}: HeaderProps) => {
    return (
        <header className={headerStyles}>
            <h1>Game of Life</h1>
            <div className={buttonContainerStyles}>
                <button className={buttonStyles} onClick={onClickReset}>
                    Reset
                </button>
                <button className={playButtonStyles} onClick={onClickStartStop}>
                    {isRunning ? "Pause" : "Play"}
                </button>
                <button className={buttonStyles} onClick={onClickNext}>
                    Next
                </button>
            </div>
        </header>
    );
};

export default GameHeader;

// #region styles
const headerStyles = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem 0;
    gap: 1rem;
    h1 {
        font-family: "Quando";
        font-size: 2.4rem;
        text-shadow: 2px 2px 2px black;
        margin: 0;
    }
`;

const buttonContainerStyles = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
`;

const buttonStyles = css`
    font-family: "VT323", monospace;
    font-size: 1.3rem;
    border: none;
    width: 5rem;
    height: 2rem;
    cursor: pointer;
    border-radius: 5%;
    color: white;
    text-shadow: -1px -1px black;
    background-color: darkcyan;
    box-shadow: 0 2px 0 black;
    display: flex;
    align-items: center;
    justify-content: center;
    &:active {
        position: relative;
        top: 1px;
        box-shadow: 0 1px 0 black;
    }
`;

const playButtonStyles = css`
    ${buttonStyles}
    height: 5rem;
    border-radius: 50%;
`;
// #endregion styles
