import { StarIcon } from "@chakra-ui/icons";
import { Button, Flex, Heading, Stack } from "@chakra-ui/react";
import { memo, RefObject } from "react";
import ColorModeSwitcher from "./ColorModeSwitcher";
import SettingsDrawerSwitcher from "./SettingsDrawerSwitcher";

type GameHeaderProps = {
    buttonRef: RefObject<HTMLButtonElement>;
    showLogs: boolean;
    onOpenSettingsMenu: () => void;
};

const GameHeader = ({
    buttonRef,
    showLogs,
    onOpenSettingsMenu,
}: GameHeaderProps) => {
    if (showLogs) {
        console.info("GameHeader rendered");
    }

    return (
        <Flex
            width="100%"
            alignItems="center"
            justifyContent="space-between"
            padding="1rem"
        >
            <SettingsDrawerSwitcher
                buttonRef={buttonRef}
                onClick={onOpenSettingsMenu}
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

const MemoizedGameHeader = memo((props: GameHeaderProps) => (
    <GameHeader {...props} />
));

export default MemoizedGameHeader;
