import { Button, Flex, Title } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";
import { memo } from "react";
import { ScreenSize } from "../constants";
import { useBreakpoints } from "../hooks/useBreakpoints";
import { ColorSchemeSwitcher } from "./ColorSchemeSwitcher";
import { SettingsDrawerSwitcher } from "./SettingsDrawerSwitcher";

type GameHeaderProps = {
  onOpenSettingsMenu: () => void;
};

const GameHeader = ({ onOpenSettingsMenu }: GameHeaderProps) => {
  const { width } = useBreakpoints();

  return (
    <Flex align="center" direction="column" gap="1rem" p="1rem">
      <Flex align="center" justify="space-between" w="100%">
        <SettingsDrawerSwitcher onClick={onOpenSettingsMenu} />
        <Title fz={width === ScreenSize.XXS ? 20 : undefined}>Game of Life</Title>
        <ColorSchemeSwitcher />
      </Flex>
      <a href="https://github.com/vftiago/game-of-life" target="_blank">
        <Button
          rightSection={<IconExternalLink size={16} />}
          size={width === ScreenSize.XXS ? "xs" : "sm"}
          variant="default"
        >
          GitHub
        </Button>
      </a>
    </Flex>
  );
};

export default memo(GameHeader);
