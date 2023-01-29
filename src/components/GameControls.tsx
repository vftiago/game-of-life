import { Button, Flex } from "@chakra-ui/react";
import { memo } from "react";

type GameControlsProps = {
    isRunning: boolean;
    onClickPlayPause: () => void;
    onClickNext: () => void;
    onClickReset: () => void;
};

const GameControls = ({
    isRunning,
    onClickPlayPause,
    onClickNext,
    onClickReset,
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
        </Flex>
    );
};

const MemoizedGameControls = memo((props: GameControlsProps) => (
    <GameControls {...props} />
));

export default MemoizedGameControls;
