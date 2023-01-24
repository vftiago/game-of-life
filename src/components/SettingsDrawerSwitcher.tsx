import { HamburgerIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { RefObject } from "react";

type SettingsMenuSwitcherProps = {
    buttonRef: RefObject<HTMLButtonElement>;
    isRunning: boolean;
    onClick: () => void;
};

export const SettingsDrawerSwitcher = ({
    buttonRef,
    isRunning,
    onClick,
}: SettingsMenuSwitcherProps) => {
    return (
        <IconButton
            ref={buttonRef}
            disabled={isRunning}
            colorScheme={"gray"}
            onClick={onClick}
            icon={<HamburgerIcon />}
            aria-label={`Open settings menu`}
            width="2rem"
        />
    );
};

export default SettingsDrawerSwitcher;
