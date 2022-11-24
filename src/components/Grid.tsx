import { css } from "@emotion/css";
import { Grid } from "../game-utils";
import { DEFAULT_COLUMN_COUNT } from "../game-utils/constants";
import { Cell } from "./Cell";

type GameGridProps = {
    grid: Grid;
};

const GameGrid = ({ grid }: GameGridProps) => {
    return (
        <div className={getGameGridStyles()}>
            {grid.map((column: boolean[], columnIndex: number) => (
                <div className={gameColumnStyles} key={columnIndex}>
                    {column.map((cell: boolean, rowIndex: number) => (
                        <Cell
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

const gameColumnStyles = css`
    display: grid;
    gap: 2px;
`;

const getGameGridStyles = () => {
    return css`
        display: grid;
        grid-template-columns: repeat(${DEFAULT_COLUMN_COUNT}, 18px);
        gap: 2px;
    `;
};
