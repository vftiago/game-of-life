import { css } from "@emotion/css";

type HeaderProps = {
    isRunning: boolean;
    onClickStartStop: () => void;
    onClickNext: () => void;
    onClickReset: () => void;
};

export const Header = ({
    isRunning,
    onClickStartStop,
    onClickNext,
    onClickReset,
}: HeaderProps) => {
    return (
        <header className={gameOfLifeHeaderStyles}>
            <h1>Game of Life</h1>
            <div className={buttonContainerStyles}>
                <button onClick={onClickStartStop}>
                    {isRunning ? "stop" : "start"}
                </button>
                <button onClick={onClickNext}>next</button>
                <button onClick={onClickReset}>reset</button>
            </div>
        </header>
    );
};

const gameOfLifeHeaderStyles = css`
    text-shadow: 2px 2px 2px black;
`;

const buttonContainerStyles = css`
    display: flex;
    justify-content: center;
    gap: 1rem;
`;
