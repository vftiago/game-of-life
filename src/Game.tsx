import { Container, Divider } from "@mantine/core";
import { useCallback } from "react";

import GameControls from "./components/GameControls";
import GameSettings from "./components/GameSettings";
import useGame from "./hooks/useGame";
import useUserSettings from "./hooks/useUserSettings";
import GameHeader from "./components/GameHeader";
import { CellType, MAX_COLUMN_COUNT } from "./constants";
import GameGrid from "./components/GameGrid";
import { useDisclosure } from "@mantine/hooks";
import { useBreakpoints } from "./hooks/useBreakpoints";

const Game = () => {
  const { width } = useBreakpoints();

  const { grid, stepNumber, isRunning, setGrid, setIsRunning, next, reset } =
    useGame();

  const {
    cellType,
    showLogs,
    isAlertVisible,
    setCellType,
    setShowLogs,
    setIsAlertVisible,
  } = useUserSettings();

  const [
    isGameSettingsOpen,
    { open: openGameSettings, close: closeGameSettings },
  ] = useDisclosure(false);

  const handleClickPlayPause = useCallback(() => {
    setIsRunning(!isRunning);
  }, [isRunning, setIsRunning]);

  const handleClickCell = useCallback(
    (columnIndex: number, rowIndex: number, alive: boolean) => {
      const newGrid = [...grid];
      grid[columnIndex][rowIndex] = !alive;
      setGrid(newGrid);
    },
    [grid, setGrid],
  );

  const handleOpenSettingsMenu = useCallback(() => {
    setIsRunning(false);
    openGameSettings();
  }, [setIsRunning, openGameSettings]);

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

  return (
    <Container size="lg">
      <GameSettings
        isAlertVisible={isAlertVisible}
        isOpen={isGameSettingsOpen}
        cellType={cellType}
        showLogs={showLogs}
        onClose={closeGameSettings}
        onSelectCellType={handleSelectCellType}
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
