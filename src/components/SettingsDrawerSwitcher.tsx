import { ActionIcon } from "@mantine/core";
import { IconMenu2 } from "@tabler/icons-react";
import { ScreenSize } from "../constants";
import { useBreakpoints } from "../hooks/useBreakpoints";

type SettingsMenuSwitcherProps = {
  onClick: () => void;
};

export const SettingsDrawerSwitcher = ({
  onClick,
}: SettingsMenuSwitcherProps) => {
  const { width } = useBreakpoints();

  return (
    <ActionIcon
      aria-label="Open settings menu"
      size={width === ScreenSize.XXS ? "md" : "lg"}
      variant="default"
      onClick={onClick}
    >
      <IconMenu2 size={20} />
    </ActionIcon>
  );
};
