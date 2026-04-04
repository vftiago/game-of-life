import { Container, Divider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useCallback } from "react";
import GameControls from "./components/GameControls";
import GameGrid from "./components/GameGrid";
import GameHeader from "./components/GameHeader";
import GameSettings from "./components/GameSettings";
import { PseudoGrid, applyRules } from "./game-utils/grid";
import { useGridState } from "./hooks/useGridState";
import { useInterval } from "./hooks/useInterval";
import { useUserSettings } from "./hooks/useUserSettings";

const Game = () => {
  const { grid, gridDimensions, isRunning, resetGrid, setGrid, setIsRunning, setStepNumber, stepNumber } =
    useGridState();

  const { cellType, interval, isAlertVisible, setCellType, setInterval, setIsAlertVisible } = useUserSettings();

  const [isGameSettingsOpen, { close: closeGameSettings, open: openGameSettings }] = useDisclosure(false);

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
        cellType={cellType}
        interval={interval}
        isAlertVisible={isAlertVisible}
        isOpen={isGameSettingsOpen}
        onClose={closeGameSettings}
        onDismissAlert={handleDismissAlert}
        onSelectCellType={handleSelectCellType}
        onSelectInterval={handleSelectInterval}
      />
      <GameHeader onOpenSettingsMenu={handleOpenSettingsMenu} />
      <Divider />
      <GameControls
        isRunning={isRunning}
        onClickNext={next}
        onClickPlayPause={handleClickPlayPause}
        onClickReset={reset}
      />
      <Divider />
      <GameGrid
        cellType={cellType}
        columnCount={gridDimensions.columnCount}
        grid={grid}
        isRunning={isRunning}
        stepNumber={stepNumber}
        onClickCell={handleClickCell}
      />
    </Container>
  );
};

export default Game;
