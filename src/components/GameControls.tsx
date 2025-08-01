import { Button, Flex } from "@mantine/core";
import { memo } from "react";
import { useBreakpoints } from "../hooks/useBreakpoints";
import { IconPlayerPause, IconPlayerPlay } from "@tabler/icons-react";
import { ScreenSize } from "../constants";

type GameControlsProps = {
  isRunning: boolean;
  onClickPlayPause: () => void;
  onClickNext: () => void;
  onClickReset: () => void;
};

const GameControls = ({
  isRunning,
  onClickPlayPause,
  onClickNext,
  onClickReset,
}: GameControlsProps) => {
  const { width } = useBreakpoints();

  return (
    <Flex align="center" justify="center" gap="1rem" p="1rem" w="100%">
      <Button
        size={width === ScreenSize.XXS ? "compact-sm" : "sm"}
        onClick={onClickReset}
        variant="gradient"
      >
        Reset
      </Button>
      <Button
        aria-label={isRunning ? "Pause" : "Play"}
        fz={width === ScreenSize.XXS ? 10 : undefined}
        radius="50%"
        onClick={onClickPlayPause}
        h={width === ScreenSize.XXS ? "4rem" : "5rem"}
        w={width === ScreenSize.XXS ? "4rem" : "5rem"}
        variant="gradient"
      >
        {isRunning ? <IconPlayerPause /> : <IconPlayerPlay />}
      </Button>
      <Button
        size={width === ScreenSize.XXS ? "compact-sm" : "sm"}
        onClick={onClickNext}
        variant="gradient"
      >
        Next
      </Button>
    </Flex>
  );
};

export default memo(GameControls);
