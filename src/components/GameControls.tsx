import { Button, Flex } from "@mantine/core";
import { memo } from "react";
import { ScreenSize, useBreakpoints } from "../hooks/useBreakpoints";
import { IconPlayerPause, IconPlayerPlay } from "@tabler/icons-react";

type GameControlsProps = {
  isRunning: boolean;
  showLogs: boolean;
  onClickPlayPause: () => void;
  onClickNext: () => void;
  onClickReset: () => void;
};

const GameControls = ({
  isRunning,
  showLogs,
  onClickPlayPause,
  onClickNext,
  onClickReset,
}: GameControlsProps) => {
  const { width } = useBreakpoints();

  if (showLogs) {
    console.info("GameControls rendered");
  }

  return (
    <Flex align="center" justify="center" gap="1rem" p="1rem" w="100%">
      <Button
        size={width === ScreenSize.XxS ? "compact-sm" : "sm"}
        onClick={onClickReset}
        variant="gradient"
      >
        Reset
      </Button>
      <Button
        aria-label={isRunning ? "Pause" : "Play"}
        fz={width === ScreenSize.XxS ? 10 : undefined}
        radius="50%"
        onClick={onClickPlayPause}
        h={width === ScreenSize.XxS ? "4rem" : "5rem"}
        w={width === ScreenSize.XxS ? "4rem" : "5rem"}
        variant="gradient"
      >
        {isRunning ? <IconPlayerPause /> : <IconPlayerPlay />}
      </Button>
      <Button
        size={width === ScreenSize.XxS ? "compact-sm" : "sm"}
        onClick={onClickNext}
        variant="gradient"
      >
        Next
      </Button>
    </Flex>
  );
};

export default memo(GameControls);
