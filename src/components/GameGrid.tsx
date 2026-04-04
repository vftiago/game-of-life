import { Flex, Stack } from "@mantine/core";
import { useMantineColorScheme } from "@mantine/core";
import { memo, useMemo } from "react";
import "./GameGrid.css";
import { PseudoGrid } from "../game-utils/grid";

type CellProps = {
  alive: number;
  aliveClass: string;
  deadClass: string;
  index: number;
  isRunning: boolean;
  onClickCell: (index: number, cell: number) => void;
};

const Cell = memo(({ alive, aliveClass, deadClass, index, isRunning, onClickCell }: CellProps) => (
  <div
    className={alive ? aliveClass : deadClass}
    onClick={() => {
      if (isRunning) return;
      onClickCell(index, alive);
    }}
  />
));

type GameGridProps = {
  cellType: "dot" | "square";
  columnCount: number;
  grid: PseudoGrid;
  isRunning: boolean;
  stepNumber: number;
  onClickCell: (index: number, cell: number) => void;
};

const GameGrid = ({ cellType, columnCount, grid, isRunning, onClickCell, stepNumber }: GameGridProps) => {
  const { colorScheme } = useMantineColorScheme();

  const cellClasses = useMemo(() => {
    const baseClass = `cell cell--${cellType} ${isRunning ? "" : "cell--hover"}`;
    const aliveClass = `${baseClass} cell--alive--${colorScheme}`;
    const deadClass = `${baseClass} cell--dead--${colorScheme}`;

    return { aliveClass, deadClass };
  }, [cellType, colorScheme, isRunning]);

  const cells = [];
  for (let i = 0; i < grid.length; i++) {
    cells.push(
      <Cell
        alive={grid[i]}
        aliveClass={cellClasses.aliveClass}
        deadClass={cellClasses.deadClass}
        index={i}
        isRunning={isRunning}
        key={i}
        onClickCell={onClickCell}
      />,
    );
  }

  return (
    <Stack>
      <div data-testid="step-number">Step: {stepNumber}</div>
      <Flex align="center" justify="center">
        <div className="grid" data-testid="game-grid" style={{ gridTemplateColumns: `repeat(${columnCount}, 1fr)` }}>
          {cells}
        </div>
      </Flex>
    </Stack>
  );
};

export default memo(GameGrid);
