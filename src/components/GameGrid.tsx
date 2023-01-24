import { Stat, StatLabel, StatNumber, useColorMode } from "@chakra-ui/react";
import { css } from "@emotion/css";
import { DEFAULT_CELL_SIZE } from "../game-utils/constants";
import { Grid } from "../game-utils/game-utils";
import GameCell from "./GameCell";

type GameGridProps = {
    columnCount: number;
    rowCount: number;
    stepNumber: number;
    grid: Grid;
};

const GameGrid = ({ columnCount, grid, stepNumber }: GameGridProps) => {
    const { colorMode } = useColorMode();

    const getBackgroundColor = (alive: boolean) => {
        if (colorMode === "light") return alive ? "#1A202C" : "white";
        return alive ? "white" : "#1A202C";
    };

    return (
        <div>
            <Stat width="4rem">
                <StatLabel>Step</StatLabel>
                <StatNumber fontSize="18px" data-testid="step-number">
                    {stepNumber}
                </StatNumber>
            </Stat>
            <div className={gridStyles(columnCount)}>
                {grid.map((column: boolean[], columnIndex: number) => (
                    <ul
                        className={columnStyles}
                        key={columnIndex}
                        data-testid="column"
                    >
                        {column.map((cell: boolean, rowIndex: number) => (
                            <GameCell
                                backgroundColor={getBackgroundColor(cell)}
                                key={
                                    columnIndex.toString() + rowIndex.toString()
                                }
                            />
                        ))}
                    </ul>
                ))}
            </div>
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

const gridStyles = (columnCount: number) => css`
    display: grid;
    grid-template-columns: repeat(${columnCount}, 1fr);
    gap: 1px;
`;
// #endregion styles
