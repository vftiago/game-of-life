import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Select,
    Stack,
} from "@chakra-ui/react";
import { RefObject, SyntheticEvent } from "react";

const selectOptions = [40, 60, 80, 100, 120];

type GameSettingsProps = {
    isOpen: boolean;
    buttonRef: RefObject<HTMLButtonElement>;
    columnCount: number;
    rowCount: number;
    onClose: () => void;
    onSelectColumnCount: (selection: number) => void;
    onSelectRowCount: (selection: number) => void;
};

const GameSettings = ({
    isOpen,
    buttonRef,
    columnCount,
    rowCount,
    onClose,
    onSelectColumnCount,
    onSelectRowCount,
}: GameSettingsProps) => {
    return (
        <Drawer
            isOpen={isOpen}
            placement="left"
            size="md"
            onClose={onClose}
            finalFocusRef={buttonRef}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Game settings</DrawerHeader>
                <DrawerBody>
                    <Stack>
                        <p>Columns:</p>
                        <Select
                            value={columnCount}
                            onChange={(
                                e: SyntheticEvent<HTMLSelectElement, Event>,
                            ) => {
                                onSelectColumnCount(
                                    Number(e.currentTarget.value),
                                );
                            }}
                        >
                            {selectOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </Select>
                        <p>Rows:</p>
                        <Select
                            value={rowCount}
                            onChange={(
                                e: SyntheticEvent<HTMLSelectElement, Event>,
                            ) => {
                                onSelectRowCount(Number(e.currentTarget.value));
                            }}
                        >
                            {selectOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </Select>
                    </Stack>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};

export default GameSettings;
