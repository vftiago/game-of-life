import { StarIcon } from "@chakra-ui/icons";
import { Button, Divider, Heading, Stack } from "@chakra-ui/react";
import GameControls from "./components/GameControls";
import GameGrid from "./components/GameGrid";
import useGame from "./game-hooks/useGame";
import useUserSettings from "./game-hooks/useUserSettings";

const Game = () => {
    const { grid, stepNumber, isRunning, setIsRunning, next, reset } =
        useGame();

    const { columnCount, rowCount, setColumnCount, setRowCount } =
        useUserSettings();

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
            <Heading as="h1">Game of Life</Heading>
            <a href="https://github.com/vftiago/game-of-life">
                <Button leftIcon={<StarIcon />} colorScheme="gray" size="sm">
                    Github
                </Button>
            </a>
            <Divider />
            <GameControls
                columnCount={columnCount}
                rowCount={rowCount}
                stepNumber={stepNumber}
                isRunning={isRunning}
                onClickPlayPause={handleOnClickPlayPause}
                onClickNext={handleClickNext}
                onClickReset={handleClickReset}
                onSelectColumnCount={handleSelectColumnCount}
                onSelectRowCount={handleSelectRowCount}
            />
            <Divider />
            <GameGrid
                columnCount={columnCount}
                rowCount={rowCount}
                grid={grid}
            />
        </Stack>
    );
};

export default Game;
