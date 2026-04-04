import { Alert, Button, Drawer, Flex, Group, NativeSelect, Radio, Stack, Text } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { memo } from "react";

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
  cellType,
  interval,
  isAlertVisible,
  isOpen,
  onClose,
  onDismissAlert,
  onSelectCellType,
  onSelectInterval,
}: GameSettingsProps) => {
  return (
    <Drawer opened={isOpen} title="Game settings" onClose={onClose}>
      <Stack>
        {isAlertVisible && (
          <Alert color="blue" icon={<IconInfoCircle />}>
            <Flex align="flex-start" direction="column" gap="1rem">
              <Text size="sm">Opening the settings menu will pause the game</Text>
              <Button size="xs" onClick={onDismissAlert}>
                Ok
              </Button>
            </Flex>
          </Alert>
        )}

        <Radio.Group
          description="The difference is purely cosmetic"
          label="Cell type"
          value={cellType}
          onChange={(value: string) => {
            onSelectCellType(value as "square" | "dot");
          }}
        >
          <Group mt="xs">
            <Radio label="Dot" value="dot" />
            <Radio label="Square" value="square" />
          </Group>
        </Radio.Group>

        <NativeSelect
          data={["20", "50", "100", "300", "500"]}
          description="How much time between each step, in milliseconds (lower is faster)"
          label="Interval"
          value={interval.toString()}
          onChange={(event) => {
            onSelectInterval(parseInt(event.currentTarget.value, 10));
          }}
        />
      </Stack>
    </Drawer>
  );
};

export default memo(GameSettings);
