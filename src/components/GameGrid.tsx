import { Flex, Stack } from "@mantine/core";
import { useMantineColorScheme } from "@mantine/core";
import { memo, useMemo } from "react";
import "./GameGrid.css";
import { PseudoGrid } from "../game-utils/grid";

type GameGridProps = {
  isRunning: boolean;
  columnCount: number;
  stepNumber: number;
  cellType: "dot" | "square";
  grid: PseudoGrid;
  onClickCell: (index: number, cell: boolean) => void;
};

const GameGrid = ({ cellType, columnCount, grid, isRunning, onClickCell, stepNumber }: GameGridProps) => {
  const { colorScheme } = useMantineColorScheme();

  const cellClasses = useMemo(() => {
    const baseClass = `cell cell--${cellType} ${isRunning ? "" : "cell--hover"}`;
    const aliveClass = `${baseClass} cell--alive--${colorScheme}`;
    const deadClass = `${baseClass} cell--dead--${colorScheme}`;

    return { aliveClass, deadClass };
  }, [cellType, colorScheme, isRunning]);

  return (
    <Stack>
      <div data-testid="step-number">Step: {stepNumber}</div>
      <Flex align="center" justify="center">
        <div className="grid" data-testid="game-grid" style={{ gridTemplateColumns: `repeat(${columnCount}, 1fr)` }}>
          {grid.map((cell: boolean, index: number) => {
            return (
              <div
                className={cell ? cellClasses.aliveClass : cellClasses.deadClass}
                key={index}
                onClick={() => {
                  if (isRunning) return;
                  onClickCell(index, cell);
                }}
              />
            );
          })}
        </div>
      </Flex>
    </Stack>
  );
};

export default memo(GameGrid);
