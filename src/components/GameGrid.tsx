import { css } from "@emotion/css";
import { Grid } from "../game-utils";
import { DEFAULT_COLUMN_COUNT } from "../game-utils/constants";
import GameCell from "./GameCell";

type GameGridProps = {
    grid: Grid;
};

const GameGrid = ({ grid }: GameGridProps) => {
    return (
        <div className={getGridStyles()}>
            {grid.map((column: boolean[], columnIndex: number) => (
                <div className={columnStyles} key={columnIndex}>
                    {column.map((cell: boolean, rowIndex: number) => (
                        <GameCell
                            alive={cell}
                            key={columnIndex.toString() + rowIndex.toString()}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default GameGrid;

// #region styles
const columnStyles = css`
    display: grid;
    gap: 2px;
`;

const getGridStyles = () => {
    return css`
        display: grid;
        grid-template-columns: repeat(${DEFAULT_COLUMN_COUNT}, 18px);
        gap: 2px;
    `;
};
// #endregion styles
