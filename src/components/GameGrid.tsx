import { css } from "@emotion/css";
import {
    DEFAULT_CELL_SIZE,
    DEFAULT_COLUMN_COUNT,
} from "../game-utils/constants";
import { Grid } from "../game-utils/game-utils";
import GameCell from "./GameCell";

type GameGridProps = {
    grid: Grid;
};

const GameGrid = ({ grid }: GameGridProps) => {
    return (
        <div className={gridStyles}>
            {grid.map((column: boolean[], columnIndex: number) => (
                <ul
                    className={columnStyles}
                    key={columnIndex}
                    data-testid="column"
                >
                    {column.map((cell: boolean, rowIndex: number) => (
                        <GameCell
                            alive={cell}
                            key={columnIndex.toString() + rowIndex.toString()}
                        />
                    ))}
                </ul>
            ))}
        </div>
    );
};

export default GameGrid;

// #region styles
const columnStyles = css`
    display: grid;
    gap: 1px;
    padding: 0;
    // we're styling cells on the parent level for performance reasons:
    // https://emotion.sh/docs/performance
    li {
        list-style: none;
        height: ${`${DEFAULT_CELL_SIZE}px`};
        width: ${`${DEFAULT_CELL_SIZE}px`};
        border-radius: 15%;
    }
`;

const gridStyles = css`
    display: grid;
    grid-template-columns: repeat(${DEFAULT_COLUMN_COUNT}, 1fr);
    gap: 1px;
`;
// #endregion styles
