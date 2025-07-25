import {
  Alert,
  Button,
  Drawer,
  Flex,
  Group,
  NativeSelect,
  Radio,
  Stack,
  Text,
} from "@mantine/core";

import { memo } from "react";
import { IconInfoCircle } from "@tabler/icons-react";

type GameSettingsProps = {
  isOpen: boolean;
  cellType: "square" | "dot";
  interval: number;
  isAlertVisible: boolean;
  onClose: () => void;
  onSelectCellType: (selection: "square" | "dot") => void;
  onSelectInterval: (value: number) => void;
  onDismissAlert: () => void;
};

const GameSettings = ({
  isOpen,
  cellType,
  interval,
  isAlertVisible,
  onClose,
  onSelectInterval,
  onSelectCellType,
  onDismissAlert,
}: GameSettingsProps) => {
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

        <Radio.Group
          label="Cell type"
          description="The difference is purely cosmetic"
          onChange={(value: string) => {
            onSelectCellType(value as "square" | "dot");
          }}
          value={cellType}
        >
          <Group mt="xs">
            <Radio value="dot" label="Dot" />
            <Radio value="square" label="Square" />
          </Group>
        </Radio.Group>

        <NativeSelect
          label="Interval"
          description="How much time between each step, in milliseconds (lower is faster)"
          value={interval.toString()}
          data={["20", "50", "100", "300", "500"]}
          onChange={(event) => {
            onSelectInterval(parseInt(event.currentTarget.value, 10));
          }}
        />
      </Stack>
    </Drawer>
  );
};

export default memo(GameSettings);
