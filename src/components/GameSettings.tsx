import { InfoIcon } from "@chakra-ui/icons";
import {
    Alert,
    AlertIcon,
    Button,
    Checkbox,
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
import { ChangeEvent, memo, RefObject, SyntheticEvent } from "react";
import { NewSettings } from "../Game";
import {
    CellType,
    GRID_SIZE_OPTIONS,
    UserSettings,
} from "../game-utils/constants";

type GameSettingsProps = {
    isOpen: boolean;
    buttonRef: RefObject<HTMLButtonElement>;
    userSettings: UserSettings;
    onClose: () => void;
    updateUserSettings: (newSettings: NewSettings) => void;
};

const GameSettings = ({
    isOpen,
    buttonRef,
    userSettings,
    onClose,
    updateUserSettings,
}: GameSettingsProps) => {
    const { columnCount, rowCount, cellType, isAlertVisible, showLogs } =
        userSettings;

    if (showLogs) {
        console.info("GameSettings rendered");
    }

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
                        {isAlertVisible && (
                            <Alert
                                status="info"
                                variant="left-accent"
                                flexDirection="column"
                            >
                                <Flex alignSelf="flex-start">
                                    <AlertIcon />
                                    Opening the settings menu will pause the
                                    game. You will have to unpause it yourself.
                                </Flex>
                                <Button
                                    colorScheme="gray"
                                    size="sm"
                                    alignSelf="flex-end"
                                    onClick={() => {
                                        updateUserSettings({
                                            isAlertVisible: false,
                                        });
                                    }}
                                >
                                    Ok
                                </Button>
                            </Alert>
                        )}

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
                                    updateUserSettings({
                                        type: "updateColumnCount",
                                        columnCount: Number(
                                            e.currentTarget.value,
                                        ),
                                    });
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
                                    updateUserSettings({
                                        type: "updateRowCount",
                                        rowCount: Number(e.currentTarget.value),
                                    });
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
                                    updateUserSettings({
                                        cellType: value,
                                    });
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
                        <Stack>
                            <Checkbox
                                isChecked={showLogs}
                                onChange={(
                                    e: ChangeEvent<HTMLInputElement>,
                                ) => {
                                    updateUserSettings({
                                        showLogs: e.target.checked,
                                    });
                                }}
                            >
                                Show logs
                            </Checkbox>
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
