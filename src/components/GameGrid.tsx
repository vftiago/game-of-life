import { Flex, Stack } from "@mantine/core";
import { useMantineColorScheme } from "@mantine/core";
import { memo, useMemo } from "react";
import "./GameGrid.css";
import { PseudoGrid } from "../game-utils/grid";

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
    const cell = grid[i];
    cells.push(
      <div
        className={cell ? cellClasses.aliveClass : cellClasses.deadClass}
        key={i}
        onClick={() => {
          if (isRunning) return;
          onClickCell(i, cell);
        }}
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
