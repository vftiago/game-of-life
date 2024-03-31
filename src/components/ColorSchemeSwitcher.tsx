import {
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
} from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { ScreenSize, useBreakpoints } from "../hooks/useBreakpoints";

export const ColorSchemeSwitcher = () => {
  const { width } = useBreakpoints();
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <ActionIcon
      size={width === ScreenSize.XxS ? "md" : "lg"}
      onClick={() =>
        setColorScheme(computedColorScheme === "light" ? "dark" : "light")
      }
      aria-label="Toggle color scheme"
      variant="default"
    >
      {colorScheme === "dark" ? <IconSun size={20} /> : <IconMoon size={20} />}
    </ActionIcon>
  );
};
