import { IconMenu2 } from "@tabler/icons-react";
import { ActionIcon } from "@mantine/core";
import { ScreenSize, useBreakpoints } from "../hooks/useBreakpoints";

type SettingsMenuSwitcherProps = {
  onClick: () => void;
};

export const SettingsDrawerSwitcher = ({
  onClick,
}: SettingsMenuSwitcherProps) => {
  const { width } = useBreakpoints();

  return (
    <ActionIcon
      size={width === ScreenSize.XxS ? "md" : "lg"}
      variant="default"
      onClick={onClick}
      aria-label="Open settings menu"
    >
      <IconMenu2 size={20} />
    </ActionIcon>
  );
};
