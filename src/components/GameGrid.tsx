import { Flex, Grid, Stack } from "@mantine/core";
import { memo } from "react";
import { DEFAULT_CELL_SIZE } from "../constants";
import { GameGridType } from "../game-utils/grid";
import { useMantineColorScheme } from "@mantine/core";
import "./GameGrid.css";

type GameGridProps = {
  isRunning: boolean;
  columnCount: number;
  stepNumber: number;
  cellType: "dot" | "square";
  grid: GameGridType;
  showLogs: boolean;
  onClickCell: (columnCount: number, rowIndex: number, cell: boolean) => void;
};

const GameGrid = ({
  isRunning,
  grid,
  stepNumber,
  cellType,
  showLogs,
  onClickCell,
  columnCount,
}: GameGridProps) => {
  if (showLogs) {
    console.info("GameGrid rendered");
  }

  const { colorScheme } = useMantineColorScheme();

  const getBackgroundColor = (alive: boolean) => {
    if (colorScheme === "light") return alive ? "#242424" : "white";
    return alive ? "white" : "#242424";
  };

  return (
    <Stack>
      <div>
        Step: <span data-testid="step-number">{stepNumber}</span>
      </div>
      <Grid
        columns={columnCount}
        gutter="1px"
        justify="center"
        overflow="hidden"
      >
        {grid.map((column: boolean[], columnIndex: number) => (
          <Grid.Col key={columnIndex} data-testid="column" span="content">
            <Flex direction="column" gap="1px">
              {column.map((cell: boolean, rowIndex: number) => (
                <div
                  className={isRunning ? "" : "cell"}
                  onClick={() => {
                    if (isRunning) return;
                    onClickCell(columnIndex, rowIndex, cell);
                  }}
                  style={{
                    backgroundColor: getBackgroundColor(cell),
                    borderRadius: cellType === "dot" ? "50%" : "15%",
                    height: `${DEFAULT_CELL_SIZE}px`,
                    width: `${DEFAULT_CELL_SIZE}px`,
                  }}
                  data-testid="cell"
                  key={columnIndex.toString() + rowIndex.toString()}
                />
              ))}
            </Flex>
          </Grid.Col>
        ))}
      </Grid>
    </Stack>
  );
};

export default memo(GameGrid);
