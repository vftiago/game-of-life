import { Flex, Stack } from "@mantine/core";
import { memo } from "react";
import { useMantineColorScheme } from "@mantine/core";
import "./GameGrid.css";
import { PseudoGrid } from "../game-utils/grid";
import clsx from "clsx";

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
                className={clsx("cell", {
                  "cell--dot": cellType === "dot",
                  "cell--square": cellType === "square",
                  "cell--alive--light": cell && colorScheme === "light",
                  "cell--alive--dark": cell && colorScheme === "dark",
                  "cell--dead--light": !cell && colorScheme === "light",
                  "cell--dead--dark": !cell && colorScheme === "dark",
                })}
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
