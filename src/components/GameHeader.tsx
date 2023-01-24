import { StarIcon } from "@chakra-ui/icons";
import { Button, Flex, Heading, Stack } from "@chakra-ui/react";
import { RefObject } from "react";
import ColorModeSwitcher from "./ColorModeSwitcher";
import SettingsDrawerSwitcher from "./SettingsDrawerSwitcher";

type GameHeaderProps = {
    buttonRef: RefObject<HTMLButtonElement>;
    isRunning: boolean;
    onClickSettingsDrawerSwitcher: () => void;
};

const GameHeader = ({
    buttonRef,
    isRunning,
    onClickSettingsDrawerSwitcher,
}: GameHeaderProps) => {
    return (
        <Flex
            width="100%"
            alignItems="center"
            justifyContent="space-between"
            padding="1rem"
        >
            <SettingsDrawerSwitcher
                buttonRef={buttonRef}
                isRunning={isRunning}
                onClick={onClickSettingsDrawerSwitcher}
            />
            <Stack direction="column" alignItems="center">
                <Heading as="h1">Game of Life</Heading>
                <a href="https://github.com/vftiago/game-of-life">
                    <Button
                        leftIcon={<StarIcon />}
                        colorScheme="gray"
                        size="sm"
                    >
                        Github
                    </Button>
                </a>
            </Stack>
            <ColorModeSwitcher />
        </Flex>
    );
};

export default GameHeader;
