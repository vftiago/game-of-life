import { Flex, Stack } from "@mantine/core";
import { memo, useMemo } from "react";
import { useMantineColorScheme } from "@mantine/core";
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

const GameGrid = ({
  isRunning,
  grid,
  stepNumber,
  cellType,
  onClickCell,
  columnCount,
}: GameGridProps) => {
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
      <Flex justify="center" align="center">
        <div
          data-testid="game-grid"
          className="grid"
          style={{ gridTemplateColumns: `repeat(${columnCount}, 1fr)` }}
        >
          {grid.map((cell: boolean, index: number) => {
            return (
              <div
                key={index}
                className={
                  cell ? cellClasses.aliveClass : cellClasses.deadClass
                }
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
