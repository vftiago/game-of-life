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
  const { columnCount, grid, isRunning, resetGrid, rowCount, setGrid, setIsRunning, setStepNumber, stepNumber } =
    useGridState();

  const { cellType, interval, isAlertVisible, setCellType, setInterval, setIsAlertVisible } = useUserSettings();

  const [isGameSettingsOpen, { close: closeGameSettings, open: openGameSettings }] = useDisclosure(false);

  const next = useCallback(() => {
    setStepNumber((prev) => prev + 1);

    setGrid((prevGrid: PseudoGrid) =>
      applyRules({
        grid: prevGrid,
        gridDimensions: { columnCount, rowCount },
      }),
    );
  }, [columnCount, rowCount, setGrid, setStepNumber]);

  const handleClickCell = useCallback(
    (index: number, alive: number) => {
      setGrid((prevGrid: PseudoGrid) => {
        const newGrid = prevGrid.slice();
        newGrid[index] = alive ? 0 : 1;
        return newGrid;
      });
    },
    [setGrid],
  );

  const handleOpenSettingsMenu = useCallback(() => {
    setIsRunning(false);
    openGameSettings();
  }, [setIsRunning, openGameSettings]);

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
        onDismissAlert={() => setIsAlertVisible(false)}
        onSelectCellType={setCellType}
        onSelectInterval={setInterval}
      />
      <GameHeader onOpenSettingsMenu={handleOpenSettingsMenu} />
      <Divider />
      <GameControls
        isRunning={isRunning}
        onClickNext={next}
        onClickPlayPause={() => setIsRunning((prev) => !prev)}
        onClickReset={resetGrid}
      />
      <Divider />
      <GameGrid
        cellType={cellType}
        columnCount={columnCount}
        grid={grid}
        isRunning={isRunning}
        stepNumber={stepNumber}
        onClickCell={handleClickCell}
      />
    </Container>
  );
};

export default Game;
