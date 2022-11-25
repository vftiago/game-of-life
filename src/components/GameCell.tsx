import { css } from "@emotion/css";
import { DEFAULT_CELL_SIZE } from "../game-utils/constants";

type GameCellProps = {
    alive: boolean;
};

const GameCell = ({ alive }: GameCellProps) => (
    <div className={getCellStyles(alive)} data-testid="cell" />
);

export default GameCell;

// #region styles
const getCellStyles = (alive: boolean) => {
    const backgroundColor = alive ? "silver" : "black";

    const cellSize = `${DEFAULT_CELL_SIZE}px`;

    return css`
        background-color: ${backgroundColor};
        height: ${cellSize};
        width: ${cellSize};
        border-radius: 15%;
    `;
};
// #endregion styles
