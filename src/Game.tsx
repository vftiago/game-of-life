import { Container, Divider } from "@mantine/core";
import { useCallback } from "react";

import GameControls from "./components/GameControls";
import GameSettings from "./components/GameSettings";
import GameHeader from "./components/GameHeader";
import GameGrid from "./components/GameGrid";
import { useDisclosure } from "@mantine/hooks";
import { useUserSettings } from "./hooks/useUserSettings";
import { useInterval } from "./hooks/useInterval";
import { PseudoGrid, applyRules } from "./game-utils/grid";
import { useGridState } from "./hooks/useGridState";

const Game = () => {
  const {
    isRunning,
    setIsRunning,
    stepNumber,
    setStepNumber,
    gridDimensions,
    grid,
    setGrid,
    resetGrid,
  } = useGridState();

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

  const next = useCallback(() => {
    setStepNumber((prev) => prev + 1);

    setGrid((prevGrid: PseudoGrid) =>
      applyRules({
        grid: prevGrid,
        gridDimensions,
      }),
    );
  }, [gridDimensions, setGrid, setStepNumber]);

  const reset = useCallback(() => {
    resetGrid();
  }, [resetGrid]);

  const handleClickPlayPause = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, [setIsRunning]);

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
