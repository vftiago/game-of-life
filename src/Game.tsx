import { Divider, Stack } from "@chakra-ui/react";
import { useCallback, useRef, useState } from "react";

import MemoizedGameControls from "./components/GameControls";
import MemoizedGameSettings from "./components/GameSettings";
import useGame from "./hooks/useGame";
import useUserSettings from "./hooks/useUserSettings";
import MemoizedGameHeader from "./components/GameHeader";
import { CellType } from "./utils/constants";
import MemoizedGameGrid from "./components/GameGrid";

const Game = () => {
  const { grid, stepNumber, isRunning, setGrid, setIsRunning, next, reset } =
    useGame();

  const {
    columnCount,
    rowCount,
    cellType,
    isAlertVisible,
    showLogs,
    setColumnCount,
    setRowCount,
    setCellType,
    setIsAlertVisible,
    setShowLogs,
  } = useUserSettings();

  const [isGameSettingsOpen, setIsGameSettingsOpen] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClickPlayPause = useCallback(() => {
    setIsRunning(!isRunning);
  }, [isRunning, setIsRunning]);

  const handleClickNext = useCallback(() => {
    next();
  }, [next]);

  const handleClickReset = useCallback(() => {
    reset(columnCount, rowCount);
  }, [reset, columnCount, rowCount]);

  const handleClickCell = useCallback(
    (columnIndex: number, rowIndex: number, alive: boolean) => {
      const newGrid = [...grid];
      newGrid[columnIndex][rowIndex] = !alive;
      setGrid(newGrid);
    },
    [grid, setGrid],
  );

  const handleSelectColumnCount = useCallback(
    (selection: number) => {
      setColumnCount(selection);
      reset(selection, rowCount);
    },
    [rowCount, setColumnCount, reset],
  );

  const handleSelectRowCount = useCallback(
    (selection: number) => {
      setRowCount(selection);
      reset(columnCount, selection);
    },
    [columnCount, setRowCount, reset],
  );

  const handleSelectCellType = useCallback(
    (selection: CellType) => {
      setCellType(selection);
    },
    [setCellType],
  );

  const handleOpenSettingsMenu = useCallback(() => {
    setIsGameSettingsOpen(true);
    setIsRunning(false);
  }, [setIsGameSettingsOpen, setIsRunning]);

  const handleCloseSettingsMenu = useCallback(() => {
    setIsGameSettingsOpen(false);
  }, []);

  const handleDismissAlert = useCallback(() => {
    setIsAlertVisible(false);
  }, [setIsAlertVisible]);

  const handleClickShowLogs = useCallback(
    (checked: boolean) => {
      setShowLogs(checked);
    },
    [setShowLogs],
  );

  return (
    <Stack direction="column" alignItems="center">
      <MemoizedGameSettings
        buttonRef={buttonRef}
        isOpen={isGameSettingsOpen}
        columnCount={columnCount}
        rowCount={rowCount}
        cellType={cellType}
        isAlertVisible={isAlertVisible}
        showLogs={showLogs}
        onClose={handleCloseSettingsMenu}
        onSelectColumnCount={handleSelectColumnCount}
        onSelectRowCount={handleSelectRowCount}
        onSelectCellType={handleSelectCellType}
        onDismissAlert={handleDismissAlert}
        onClickShowLogs={handleClickShowLogs}
      />
      <MemoizedGameHeader
        buttonRef={buttonRef}
        showLogs={showLogs}
        onOpenSettingsMenu={handleOpenSettingsMenu}
      />
      <Divider />
      <MemoizedGameControls
        isRunning={isRunning}
        showLogs={showLogs}
        onClickPlayPause={handleClickPlayPause}
        onClickNext={handleClickNext}
        onClickReset={handleClickReset}
      />
      <Divider />
      <MemoizedGameGrid
        columnCount={columnCount}
        stepNumber={stepNumber}
        cellType={cellType}
        grid={grid}
        showLogs={showLogs}
        onClickCell={handleClickCell}
      />
    </Stack>
  );
};

export default Game;
