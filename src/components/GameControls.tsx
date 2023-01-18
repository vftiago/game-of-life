import {
    Button,
    Flex,
    Select,
    Stat,
    StatLabel,
    StatNumber,
} from "@chakra-ui/react";
import { SyntheticEvent } from "react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

const selectOptions = [30, 60, 120];

type GameControlsProps = {
    columnCount: number;
    rowCount: number;
    stepNumber: number;
    isRunning: boolean;
    onClickPlayPause: () => void;
    onClickNext: () => void;
    onClickReset: () => void;
    onSelectColumnCount: (selection: number) => void;
    onSelectRowCount: (selection: number) => void;
};

const GameControls = ({
    columnCount,
    rowCount,
    stepNumber,
    isRunning,
    onClickPlayPause,
    onClickNext,
    onClickReset,
    onSelectColumnCount,
    onSelectRowCount,
}: GameControlsProps) => {
    return (
        <Flex alignItems="center" gap="1rem" padding="1rem">
            <Button onClick={onClickReset}>Reset</Button>
            <Button
                borderRadius="50%"
                onClick={onClickPlayPause}
                height="5rem"
                width="5rem"
            >
                {isRunning ? "Pause" : "Play"}
            </Button>

            <Button onClick={onClickNext}>Next</Button>
            <p>Columns:</p>
            <Select
                value={columnCount}
                onChange={(e: SyntheticEvent<HTMLSelectElement, Event>) => {
                    onSelectColumnCount(Number(e.currentTarget.value));
                }}
                disabled={isRunning}
                width="5rem"
            >
                {selectOptions.map((option) => (
                    <option value={option}>{option}</option>
                ))}
            </Select>
            <p>Rows:</p>
            <Select
                value={rowCount}
                onChange={(e: SyntheticEvent<HTMLSelectElement, Event>) => {
                    onSelectRowCount(Number(e.currentTarget.value));
                }}
                disabled={isRunning}
                width="5rem"
            >
                {selectOptions.map((option) => (
                    <option selected={option === rowCount} value={option}>
                        {option}
                    </option>
                ))}
            </Select>
            <Stat width="4rem">
                <StatLabel>Step</StatLabel>
                <StatNumber fontSize="18px" data-testid="step-number">
                    {stepNumber}
                </StatNumber>
            </Stat>
            <ColorModeSwitcher />
        </Flex>
    );
};

export default GameControls;
