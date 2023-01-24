import { Divider, Stack } from "@chakra-ui/react";
import { useRef, useState } from "react";

import GameControls from "./components/GameControls";
import GameGrid from "./components/GameGrid";
import GameSettings from "./components/GameSettings";
import useGame from "./game-hooks/useGame";
import useUserSettings from "./game-hooks/useUserSettings";
import GameHeader from "./components/GameHeader";

const Game = () => {
    const { grid, stepNumber, isRunning, setIsRunning, next, reset } =
        useGame();

    const { columnCount, rowCount, setColumnCount, setRowCount } =
        useUserSettings();

    const [isGameSettingsOpen, setIsGameSettingsOpen] = useState(false);

    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleOnClickPlayPause = () => {
        setIsRunning(!isRunning);
    };

    const handleClickNext = () => {
        next();
    };

    const handleClickReset = () => {
        reset(columnCount, rowCount);
    };

    const handleSelectColumnCount = (selection: number) => {
        setColumnCount(selection);
        reset(selection, rowCount);
    };

    const handleSelectRowCount = (selection: number) => {
        setRowCount(selection);
        reset(columnCount, selection);
    };

    return (
        <Stack direction="column" alignItems="center">
            <GameSettings
                buttonRef={buttonRef}
                isOpen={isGameSettingsOpen}
                columnCount={columnCount}
                rowCount={rowCount}
                onClose={() => {
                    setIsGameSettingsOpen(false);
                }}
                onSelectColumnCount={handleSelectColumnCount}
                onSelectRowCount={handleSelectRowCount}
            />
            <GameHeader
                buttonRef={buttonRef}
                isRunning={isRunning}
                onClickSettingsDrawerSwitcher={() => {
                    setIsGameSettingsOpen(!isGameSettingsOpen);
                }}
            />
            <Divider />
            <GameControls
                isRunning={isRunning}
                onClickPlayPause={handleOnClickPlayPause}
                onClickNext={handleClickNext}
                onClickReset={handleClickReset}
            />
            <Divider />
            <GameGrid
                columnCount={columnCount}
                rowCount={rowCount}
                stepNumber={stepNumber}
                grid={grid}
            />
        </Stack>
    );
};

export default Game;
