import { HamburgerIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { RefObject } from "react";

type SettingsMenuSwitcherProps = {
    buttonRef: RefObject<HTMLButtonElement>;
    onClick: () => void;
};

export const SettingsDrawerSwitcher = ({
    buttonRef,
    onClick,
}: SettingsMenuSwitcherProps) => {
    return (
        <IconButton
            ref={buttonRef}
            colorScheme={"gray"}
            onClick={onClick}
            icon={<HamburgerIcon />}
            aria-label={`Open settings menu`}
            width="2rem"
        />
    );
};

export default SettingsDrawerSwitcher;
