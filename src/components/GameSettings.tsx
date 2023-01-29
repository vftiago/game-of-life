import { InfoIcon } from "@chakra-ui/icons";
import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    Radio,
    RadioGroup,
    Select,
    Stack,
    Tooltip,
} from "@chakra-ui/react";
import { memo, RefObject, SyntheticEvent } from "react";
import { CellType, GRID_SIZE_OPTIONS } from "../game-utils/constants";

type GameSettingsProps = {
    isOpen: boolean;
    buttonRef: RefObject<HTMLButtonElement>;
    columnCount: number;
    rowCount: number;
    cellType: CellType;
    onClose: () => void;
    onSelectColumnCount: (selection: number) => void;
    onSelectRowCount: (selection: number) => void;
    onSelectCellType: (selection: CellType) => void;
};

const GameSettings = ({
    isOpen,
    buttonRef,
    columnCount,
    rowCount,
    cellType,
    onClose,
    onSelectColumnCount,
    onSelectRowCount,
    onSelectCellType,
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
                    <Stack gap="2rem">
                        <p>Opening the settings menu will pause the game.</p>
                        <Stack>
                            <Flex align="center" justifyContent="space-between">
                                <p>Columns:</p>
                                <Tooltip
                                    hasArrow
                                    label="This will affect performance"
                                    fontSize="md"
                                    placement="top"
                                >
                                    <InfoIcon />
                                </Tooltip>
                            </Flex>
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
                                {GRID_SIZE_OPTIONS.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </Select>
                        </Stack>
                        <Stack>
                            <Flex align="center" justifyContent="space-between">
                                <p>Rows:</p>
                                <Tooltip
                                    hasArrow
                                    label="This will affect performance"
                                    fontSize="md"
                                    placement="top"
                                >
                                    <InfoIcon />
                                </Tooltip>
                            </Flex>
                            <Select
                                value={rowCount}
                                onChange={(
                                    e: SyntheticEvent<HTMLSelectElement, Event>,
                                ) => {
                                    onSelectRowCount(
                                        Number(e.currentTarget.value),
                                    );
                                }}
                            >
                                {GRID_SIZE_OPTIONS.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </Select>
                        </Stack>
                        <Stack>
                            <p>Cell type:</p>
                            <RadioGroup
                                onChange={(value: CellType) => {
                                    onSelectCellType(value);
                                }}
                                value={cellType}
                            >
                                <Stack>
                                    <Radio value={CellType.Dot}>Dot</Radio>
                                    <Radio value={CellType.Square}>
                                        Square
                                    </Radio>
                                </Stack>
                            </RadioGroup>
                        </Stack>
                    </Stack>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};

const MemoizedGameSettings = memo((props: GameSettingsProps) => (
    <GameSettings {...props} />
));

export default MemoizedGameSettings;
