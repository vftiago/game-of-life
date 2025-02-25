import { Container, Divider } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";

import GameControls from "./components/GameControls";
import GameSettings from "./components/GameSettings";
import GameHeader from "./components/GameHeader";
import { CellType, MAX_COLUMN_COUNT, MAX_ROW_COUNT } from "./constants";
import GameGrid from "./components/GameGrid";
import { useDisclosure } from "@mantine/hooks";
import { useBreakpoints } from "./hooks/useBreakpoints";
import { useUserSettings } from "./hooks/useUserSettings";
import { useInterval } from "./hooks/useInterval";
import {
  GameGridType,
  getNextGrid,
  getRandomizedGrid,
} from "./game-utils/grid";

const Game = () => {
  const {
    cellType,
    showLogs,
    interval,
    isAlertVisible,
    setCellType,
    setShowLogs,
    setInterval,
    setIsAlertVisible,
  } = useUserSettings();

  const [
    isGameSettingsOpen,
    { open: openGameSettings, close: closeGameSettings },
  ] = useDisclosure(false);

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [stepNumber, setStepNumber] = useState<number>(0);
  const { height, width } = useBreakpoints();
  const [grid, setGrid] = useState<GameGridType>(
    getRandomizedGrid(MAX_COLUMN_COUNT[width], MAX_ROW_COUNT[height]),
  );

  const reset = useCallback(() => {
    setIsRunning(false);
    setStepNumber(0);
    setGrid(getRandomizedGrid(MAX_COLUMN_COUNT[width], MAX_ROW_COUNT[height]));
  }, [height, width]);

  const next = useCallback(() => {
    setStepNumber((prev) => prev + 1);
    setGrid((prevGrid) => getNextGrid(prevGrid));
  }, []);

  const handleClickPlayPause = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  const handleClickCell = useCallback(
    (columnIndex: number, rowIndex: number, alive: boolean) => {
      setGrid((prevGrid) => {
        const newGrid = [...prevGrid];
        newGrid[columnIndex] = [...newGrid[columnIndex]];
        newGrid[columnIndex][rowIndex] = !alive;
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
    (selection: CellType) => {
      setCellType(selection);
    },
    [setCellType],
  );

  const handleClickShowLogs = useCallback(
    (checked: boolean) => {
      setShowLogs(checked);
    },
    [setShowLogs],
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
    window.addEventListener("resize", reset);
    return () => window.removeEventListener("resize", reset);
  }, [reset]);

  return (
    <Container size="lg">
      <GameSettings
        interval={interval}
        isAlertVisible={isAlertVisible}
        isOpen={isGameSettingsOpen}
        cellType={cellType}
        showLogs={showLogs}
        onClose={closeGameSettings}
        onSelectCellType={handleSelectCellType}
        onSelectInterval={handleSelectInterval}
        onClickShowLogs={handleClickShowLogs}
        onDismissAlert={handleDismissAlert}
      />
      <GameHeader
        showLogs={showLogs}
        onOpenSettingsMenu={handleOpenSettingsMenu}
      />
      <Divider />
      <GameControls
        isRunning={isRunning}
        showLogs={showLogs}
        onClickPlayPause={handleClickPlayPause}
        onClickNext={next}
        onClickReset={reset}
      />
      <Divider />
      <GameGrid
        isRunning={isRunning}
        columnCount={MAX_COLUMN_COUNT[width]}
        stepNumber={stepNumber}
        cellType={cellType}
        grid={grid}
        showLogs={showLogs}
        onClickCell={handleClickCell}
      />
    </Container>
  );
};

export default Game;
