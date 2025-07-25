import { IconExternalLink } from "@tabler/icons-react";
import { Button, Flex, Title } from "@mantine/core";
import { memo } from "react";
import { ColorSchemeSwitcher } from "./ColorSchemeSwitcher";
import { SettingsDrawerSwitcher } from "./SettingsDrawerSwitcher";
import { useBreakpoints } from "../hooks/useBreakpoints";
import { ScreenSize } from "../constants";

type GameHeaderProps = {
  onOpenSettingsMenu: () => void;
};

const GameHeader = ({ onOpenSettingsMenu }: GameHeaderProps) => {
  const { width } = useBreakpoints();

  return (
    <Flex direction="column" align="center" p="1rem" gap="1rem">
      <Flex justify="space-between" w="100%" align="center">
        <SettingsDrawerSwitcher onClick={onOpenSettingsMenu} />
        <Title fz={width === ScreenSize.XxS ? 20 : undefined}>
          Game of Life
        </Title>
        <ColorSchemeSwitcher />
      </Flex>
      <a href="https://github.com/vftiago/game-of-life" target="_blank">
        <Button
          variant="default"
          rightSection={<IconExternalLink size={16} />}
          size={width === ScreenSize.XxS ? "xs" : "sm"}
        >
          GitHub
        </Button>
      </a>
    </Flex>
  );
};

export default memo(GameHeader);
