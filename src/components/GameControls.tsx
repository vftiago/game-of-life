import { Button, Flex } from "@mantine/core";
import { IconPlayerPause, IconPlayerPlay } from "@tabler/icons-react";
import { memo } from "react";
import { ScreenSize } from "../constants";
import { useBreakpoints } from "../hooks/useBreakpoints";

type GameControlsProps = {
  isRunning: boolean;
  onClickPlayPause: () => void;
  onClickNext: () => void;
  onClickReset: () => void;
};

const GameControls = ({
  isRunning,
  onClickNext,
  onClickPlayPause,
  onClickReset,
}: GameControlsProps) => {
  const { width } = useBreakpoints();

  return (
    <Flex align="center" gap="1rem" justify="center" p="1rem" w="100%">
      <Button
        size={width === ScreenSize.XXS ? "compact-sm" : "sm"}
        variant="gradient"
        onClick={onClickReset}
      >
        Reset
      </Button>
      <Button
        aria-label={isRunning ? "Pause" : "Play"}
        fz={width === ScreenSize.XXS ? 10 : undefined}
        h={width === ScreenSize.XXS ? "4rem" : "5rem"}
        radius="50%"
        variant="gradient"
        w={width === ScreenSize.XXS ? "4rem" : "5rem"}
        onClick={onClickPlayPause}
      >
        {isRunning ? <IconPlayerPause /> : <IconPlayerPlay />}
      </Button>
      <Button
        size={width === ScreenSize.XXS ? "compact-sm" : "sm"}
        variant="gradient"
        onClick={onClickNext}
      >
        Next
      </Button>
    </Flex>
  );
};

export default memo(GameControls);
