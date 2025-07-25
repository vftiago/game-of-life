import { Container, Divider } from "@mantine/core";
import { useCallback, useEffect, useMemo, useState } from "react";

import GameControls from "./components/GameControls";
import GameSettings from "./components/GameSettings";
import GameHeader from "./components/GameHeader";
import GameGrid from "./components/GameGrid";
import { useDisclosure } from "@mantine/hooks";
import { useUserSettings } from "./hooks/useUserSettings";
import { useInterval } from "./hooks/useInterval";
import {
  PseudoGrid,
  applyRules,
  createEmptyGrid,
  randomizeGrid,
} from "./game-utils/grid";
import { useGridDimensions } from "./hooks/useGridSize";

const Game = () => {
  const {
    cellType,
    interval,
    isAlertVisible,
    setCellType,
    setInterval,
    setIsAlertVisible,
  } = useUserSettings();

  const [
    isGameSettingsOpen,
    { open: openGameSettings, close: closeGameSettings },
  ] = useDisclosure(false);

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [stepNumber, setStepNumber] = useState<number>(0);

  const gridDimensions = useGridDimensions();

  const initialGrid = useMemo(() => {
    const emptyGrid = createEmptyGrid(gridDimensions);

    const randomizedGrid = randomizeGrid({ grid: emptyGrid });

    return applyRules({
      grid: randomizedGrid,
      gridDimensions,
    });
  }, [gridDimensions]);

  const [grid, setGrid] = useState<PseudoGrid>(initialGrid);

  const reset = useCallback(() => {
    setIsRunning(false);
    setStepNumber(0);
    setGrid(initialGrid);
  }, [initialGrid]);

  const next = useCallback(() => {
    setStepNumber((prev) => prev + 1);

    setGrid((prevGrid: PseudoGrid) =>
      applyRules({
        grid: prevGrid,
        gridDimensions,
      }),
    );
  }, [gridDimensions]);

  const handleClickPlayPause = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  const handleClickCell = useCallback(
    (index: number, alive: boolean) => {
      setGrid((prevGrid: PseudoGrid) => {
        const newGrid = [...prevGrid];
        newGrid[index] = !alive;
        return newGrid;
      });
    },
    [setGrid],
  );

  const handleOpenSettingsMenu = useCallback(() => {
    setIsRunning(false);
    openGameSettings();
  }, [setIsRunning, openGameSettings]);

  const handleSelectInterval = useCallback(
    (value: number) => {
      setInterval(value);
    },
    [setInterval],
  );

  const handleSelectCellType = useCallback(
    (selection: "square" | "dot") => {
      setCellType(selection);
    },
    [setCellType],
  );

  const handleDismissAlert = useCallback(() => {
    setIsAlertVisible(false);
  }, [setIsAlertVisible]);

  const intervalCallback = useCallback(() => {
    if (!isRunning) {
      return;
    }

    next();
  }, [isRunning, next]);

  useInterval(intervalCallback, interval);

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <Container size="xl">
      <GameSettings
        interval={interval}
        isAlertVisible={isAlertVisible}
        isOpen={isGameSettingsOpen}
        cellType={cellType}
        onClose={closeGameSettings}
        onSelectCellType={handleSelectCellType}
        onSelectInterval={handleSelectInterval}
        onDismissAlert={handleDismissAlert}
      />
      <GameHeader onOpenSettingsMenu={handleOpenSettingsMenu} />
      <Divider />
      <GameControls
        isRunning={isRunning}
        onClickPlayPause={handleClickPlayPause}
        onClickNext={next}
        onClickReset={reset}
      />
      <Divider />
      <GameGrid
        isRunning={isRunning}
        columnCount={gridDimensions.columnCount}
        stepNumber={stepNumber}
        cellType={cellType}
        grid={grid}
        onClickCell={handleClickCell}
      />
    </Container>
  );
};

export default Game;
