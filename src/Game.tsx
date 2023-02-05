import { Divider, Stack } from "@chakra-ui/react";
import { useCallback, useReducer, useRef, useState } from "react";
import MemoizedGameControls from "./components/GameControls";
import MemoizedGameSettings from "./components/GameSettings";
import useGame from "./game-hooks/useGame";
import MemoizedGameHeader from "./components/GameHeader";
import { DEFAULT_USER_SETTINGS, UserSettings } from "./game-utils/constants";
import MemoizedGameGrid from "./components/GameGrid";
import invariant from "tiny-invariant";

export type NewSettings = Partial<UserSettings> & {
    type?: "updateColumnCount" | "updateRowCount";
};

const Game = () => {
    const { grid, stepNumber, isRunning, setGrid, setIsRunning, next, reset } =
        useGame();

    // this looks slightly prettier than a bunch of handler callbacks but it doesn't help with the unnecessary renders problem...
    const [userSettings, updateUserSettings] = useReducer(
        (settings: UserSettings, newSettings: NewSettings) => {
            switch (newSettings.type) {
                case "updateColumnCount":
                    invariant(newSettings.columnCount);
                    reset(newSettings.columnCount, settings.rowCount);
                    return { ...settings, ...newSettings };
                case "updateRowCount":
                    invariant(newSettings.rowCount);
                    reset(settings.columnCount, newSettings.rowCount);
                    return { ...settings, ...newSettings };
                default:
                    return { ...settings, ...newSettings };
            }
        },
        DEFAULT_USER_SETTINGS,
    );

    // ...because with this approach the entire userSettings object will always be new with every update
    const { columnCount, rowCount, cellType, showLogs } = userSettings;

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

    const handleOpenSettingsMenu = useCallback(() => {
        setIsGameSettingsOpen(true);
        setIsRunning(false);
    }, [setIsGameSettingsOpen, setIsRunning]);

    const handleCloseSettingsMenu = useCallback(() => {
        setIsGameSettingsOpen(false);
    }, []);

    const handleUpdateUserSettings = (newSettings: Partial<UserSettings>) => {
        updateUserSettings({
            ...userSettings,
            ...newSettings,
        });
    };

    return (
        <Stack direction="column" alignItems="center">
            <MemoizedGameSettings
                buttonRef={buttonRef}
                isOpen={isGameSettingsOpen}
                userSettings={userSettings}
                onClose={handleCloseSettingsMenu}
                updateUserSettings={handleUpdateUserSettings}
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
