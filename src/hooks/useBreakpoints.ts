import { useEffect, useState } from "react";
import { ScreenSize } from "../constants";

const breakpoints = {
  [ScreenSize.XxS]: 0,
  [ScreenSize.Xs]: 375,
  [ScreenSize.Sm]: 576,
  [ScreenSize.Md]: 768,
  [ScreenSize.Lg]: 1024,
  [ScreenSize.Xl]: 1200,
  [ScreenSize.Xxl]: 1540,
};

const getScreenSize = () => {
  const height = window.innerHeight;
  const width = window.innerWidth;

  const screenSize = {
    height: ScreenSize.XxS,
    width: ScreenSize.XxS,
  };

  for (const size of Object.values(ScreenSize)) {
    if (height >= breakpoints[size]) {
      screenSize.height = size;
    }
    if (width >= breakpoints[size]) {
      screenSize.width = size;
    }
  }

  return screenSize;
};

export const useBreakpoints = () => {
  const [screenSize, setScreenSize] = useState<{
    height: ScreenSize;
    width: ScreenSize;
  }>(getScreenSize);

  const handleResize = () => {
    setScreenSize(getScreenSize);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
};
