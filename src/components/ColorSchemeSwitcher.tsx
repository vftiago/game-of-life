import { ActionIcon, useMantineColorScheme, useComputedColorScheme } from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { ScreenSize } from "../constants";
import { useBreakpoints } from "../hooks/useBreakpoints";

export const ColorSchemeSwitcher = () => {
  const { width } = useBreakpoints();
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <ActionIcon
      aria-label="Toggle color scheme"
      size={width === ScreenSize.XXS ? "md" : "lg"}
      variant="default"
      onClick={() => setColorScheme(computedColorScheme === "light" ? "dark" : "light")}
    >
      {colorScheme === "dark" ? <IconSun size={20} /> : <IconMoon size={20} />}
    </ActionIcon>
  );
};
