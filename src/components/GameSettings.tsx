import {
  Alert,
  Button,
  Checkbox,
  Drawer,
  Flex,
  Group,
  NativeSelect,
  Radio,
  Stack,
  Text,
} from "@mantine/core";

import { ChangeEvent, memo } from "react";
import { CellType } from "../constants";
import { IconInfoCircle } from "@tabler/icons-react";

type GameSettingsProps = {
  isOpen: boolean;
  cellType: CellType;
  interval: number;
  showLogs: boolean;
  isAlertVisible: boolean;
  onClose: () => void;
  onSelectCellType: (selection: CellType) => void;
  onSelectInterval: (value: number) => void;
  onClickShowLogs: (checked: boolean) => void;
  onDismissAlert: () => void;
};

const GameSettings = ({
  isOpen,
  cellType,
  interval,
  showLogs,
  isAlertVisible,
  onClose,
  onSelectInterval,
  onSelectCellType,
  onClickShowLogs,
  onDismissAlert,
}: GameSettingsProps) => {
  if (showLogs) {
    console.info("GameSettings rendered");
  }

  return (
    <Drawer
      opened={isOpen}
      onClose={onClose}
      title="Game settings"
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
    >
      <Stack>
        {isAlertVisible && (
          <Alert color="blue" icon={<IconInfoCircle />}>
            <Flex direction="column" gap="1rem" align="flex-start">
              <Text size="sm">
                Opening the settings menu will pause the game
              </Text>
              <Button size="xs" onClick={onDismissAlert}>
                Ok
              </Button>
            </Flex>
          </Alert>
        )}
        <Checkbox
          label="Show console logs"
          checked={showLogs}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            onClickShowLogs(e.target.checked);
          }}
        />

        <Radio.Group
          label="Cell type"
          description="The difference is purely cosmetic"
          onChange={(value: string) => {
            onSelectCellType(value as CellType);
          }}
          value={cellType}
        >
          <Group mt="xs">
            <Radio value={CellType.Dot} label="Dot" />
            <Radio value={CellType.Square} label="Square" />
          </Group>
        </Radio.Group>

        <NativeSelect
          label="Interval"
          description="How much time between each step, in milliseconds (lower is faster)"
          value={interval.toString()}
          data={["80", "100", "200", "300", "500"]}
          onChange={(event) => {
            onSelectInterval(parseInt(event.currentTarget.value, 10));
          }}
        />
      </Stack>
    </Drawer>
  );
};

export default memo(GameSettings);
